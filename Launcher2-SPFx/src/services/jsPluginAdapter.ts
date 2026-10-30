/**
 * Adapts a plain JavaScript plugin ({ init?, mount, unmount }) to the IPlugin interface.
 * hostMode "mount": Shadow DOM in the host page. hostMode "iframe": sandboxed iframe + bridge.
 */

import { IPlugin, ISharedContext } from '../types';
import { IframeBridge } from './iframeBridge';
import type { IPluginManifest } from './pluginLoader';

export interface IJsPluginModule {
  init?(ctx: ISharedContext): void | Promise<void>;
  mount(container: HTMLElement, ctx: ISharedContext): void | Promise<void>;
  unmount?(): void | Promise<void>;
}

export class JsPluginAdapter implements IPlugin {
  id: string;
  title: string;
  version: string;
  description?: string;

  private ctx?: ISharedContext;
  private initialized = false;
  private bridge?: IframeBridge;
  private host?: HTMLElement;

  constructor(
    private manifest: IPluginManifest,
    private entry: string,
    private mod?: IJsPluginModule
  ) {
    this.id = manifest.id;
    this.title = manifest.title;
    this.version = manifest.version;
    this.description = manifest.description;
  }

  async initialize(context: ISharedContext): Promise<void> {
    this.ctx = context;
    if (this.initialized) return;
    await this.mod?.init?.(context);
    this.initialized = true;
  }

  async render(container: HTMLElement): Promise<void> {
    if (!this.ctx) throw new Error(`Plugin ${this.id} rendered before initialize`);

    this.host = document.createElement('div');
    container.appendChild(this.host);

    if (this.manifest.hostMode === 'iframe') {
      this.renderIframe(this.host, this.ctx);
      return;
    }

    if (!this.mod) throw new Error(`Plugin ${this.id} has no module for mount mode`);
    const root = this.host.attachShadow({ mode: 'open' });
    const app = document.createElement('div');
    root.appendChild(app);
    await this.mod.mount(app, this.ctx);
  }

  async dispose(): Promise<void> {
    this.bridge?.stop();
    this.bridge = undefined;
    await this.mod?.unmount?.();
    this.host?.remove();
    this.host = undefined;
    this.initialized = false;
  }

  private renderIframe(parent: HTMLElement, ctx: ISharedContext): void {
    const url = new URL(this.entry, window.location.href);
    const sameOrigin = url.origin === window.location.origin;

    const iframe = document.createElement('iframe');
    // allow-same-origin + allow-scripts on a same-origin frame would void the sandbox
    iframe.setAttribute(
      'sandbox',
      sameOrigin
        ? 'allow-scripts allow-forms'
        : 'allow-scripts allow-same-origin allow-forms allow-popups'
    );
    iframe.src = url.href;
    iframe.title = this.title;
    iframe.style.cssText = `width:100%;border:0;height:${this.manifest.iframeHeight ?? 600}px`;
    parent.appendChild(iframe);

    this.bridge = new IframeBridge(iframe, this.id, ctx, sameOrigin ? 'null' : url.origin);
    this.bridge.start();
  }
}
