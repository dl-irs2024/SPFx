/**
 * Host side of the postMessage bridge for iframe-mode JavaScript plugins.
 * Only an allowlisted subset of the shared context is exposed; tokens never cross.
 */

import { ISharedContext, UnsubscribeFn } from '../types';

const PLUGIN_TAG = 'launcher-plugin';
const HOST_TAG = 'launcher-host';

export class IframeBridge {
  private subscriptions = new Map<string, UnsubscribeFn>();
  private listener = (e: MessageEvent) => this.onMessage(e);

  constructor(
    private iframe: HTMLIFrameElement,
    private pluginId: string,
    private ctx: ISharedContext,
    // 'null' for sandboxed opaque-origin frames
    private expectedOrigin: string
  ) {}

  start(): void {
    window.addEventListener('message', this.listener);
  }

  stop(): void {
    window.removeEventListener('message', this.listener);
    this.subscriptions.forEach((unsub) => unsub());
    this.subscriptions.clear();
  }

  private post(message: Record<string, unknown>): void {
    const target = this.expectedOrigin === 'null' ? '*' : this.expectedOrigin;
    this.iframe.contentWindow?.postMessage({ source: HOST_TAG, ...message }, target);
  }

  private async onMessage(e: MessageEvent): Promise<void> {
    if (e.source !== this.iframe.contentWindow) return;
    if (e.origin !== this.expectedOrigin) return;
    const data = e.data;
    if (!data || data.source !== PLUGIN_TAG) return;

    const { id, method, args = [] } = data;
    try {
      this.post({ id, result: await this.handle(method, args) });
    } catch (err) {
      this.post({ id, error: err instanceof Error ? err.message : String(err) });
    }
  }

  private async handle(method: string, args: any[]): Promise<unknown> {
    switch (method) {
      case 'getContext': {
        const u = this.ctx.currentUser;
        return {
          pluginId: this.pluginId,
          user: { id: u.id, displayName: u.displayName, upn: u.upn, email: u.email },
        };
      }
      case 'publish': {
        const [type, payload] = args;
        this.ctx.eventBus.publish({ type: String(type), sourcePluginId: this.pluginId, payload });
        return null;
      }
      case 'subscribe': {
        const [type] = args;
        const key = String(type);
        if (!this.subscriptions.has(key)) {
          this.subscriptions.set(
            key,
            this.ctx.eventBus.subscribe(key, (event) => {
              this.post({ event: { type: event.type, payload: event.payload } });
            })
          );
        }
        return null;
      }
      case 'unsubscribe': {
        const key = String(args[0]);
        this.subscriptions.get(key)?.();
        this.subscriptions.delete(key);
        return null;
      }
      default:
        throw new Error(`Method not allowed: ${method}`);
    }
  }
}
