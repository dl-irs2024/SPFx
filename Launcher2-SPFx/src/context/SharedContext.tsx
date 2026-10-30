/**
 * Shared Context Provider
 * Wraps all services and provides them to plugins via React Context
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ISharedContext } from '../types';
import { Logger } from '../services/logger';
import { FrameworkEventBus } from '../services/eventBus';
import { SharedDataService } from '../services/sharedDataService';
import { SharePointClient } from '../services/spClientService';
import { GraphClient } from '../services/graphClientService';
import { AuthService } from '../services/authService';
import { ProxyMiddleware } from '../services/proxyMiddleware';
import { PowerPlatformService } from '../services/powerPlatformService';
import { EntraService } from '../services/entraService';
import { NotificationService } from '../services/notificationService';
import { PluginLoader } from '../services/pluginLoader';

/**
 * Shared context (filled by provider)
 */
const SharedContext = createContext<ISharedContext | null>(null);

/**
 * Props for SharedContextProvider
 */
interface SharedContextProviderProps {
  children: ReactNode;
  spfxContext: any; // SPFx context from web part
  pageContext: any; // SPFx pageContext
  featureFlags?: {
    enableEntraService?: boolean;
    enablePowerPlatformService?: boolean;
    enableDebugMode?: boolean;
  };
}

/**
 * Provider component that instantiates all services and provides them via context
 */
export const SharedContextProvider: React.FC<SharedContextProviderProps> = ({
  children,
  spfxContext,
  pageContext,
  featureFlags,
}) => {
  const [context, setContext] = useState<ISharedContext | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const providerLogger = React.useMemo(() => new Logger('SharedContext'), []);

  useEffect(() => {
    const initializeContext = async () => {
      try {
        const entraEnabled = !!featureFlags?.enableEntraService;
        const powerPlatformEnabled = !!featureFlags?.enablePowerPlatformService;
        const debugMode = !!featureFlags?.enableDebugMode;

        // Create services in dependency order
        const eventBus = new FrameworkEventBus(providerLogger);
        const dataService = new SharedDataService(providerLogger);
        const authService = new AuthService(spfxContext, pageContext, providerLogger);
        const proxyMiddleware = new ProxyMiddleware(providerLogger);

        // Services that require auth or HTTP client
        const spClient = new SharePointClient(spfxContext, providerLogger);
        const graphClient = new GraphClient(spfxContext, providerLogger);
        const powerPlatformService = powerPlatformEnabled
          ? new PowerPlatformService(graphClient, providerLogger)
          : undefined;
        const entraService = entraEnabled
          ? new EntraService(graphClient, providerLogger)
          : undefined;
        const notificationService = new NotificationService(providerLogger);

        // Get current user
        const currentUser = {
          id: pageContext.user.loginName,
          email: pageContext.user.email,
          displayName: pageContext.user.displayName,
        };

        // Create shared context object
        const sharedContext: ISharedContext = {
          eventBus,
          dataService,
          spClient,
          graphClient,
          authService,
          powerPlatformService,
          entraService,
          logger: providerLogger,
          notificationService,
          proxyMiddleware,
          currentUser,
          capabilities: {
            entraEnabled,
            powerPlatformEnabled,
            debugMode,
          },
          pageContext,
          pluginLoader: new PluginLoader(providerLogger),
        };

        providerLogger.log('Shared context initialized successfully');
        setContext(sharedContext);
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        providerLogger.error('Failed to initialize shared context', error);
        setError(error);
      }
    };

    initializeContext();
  }, [spfxContext, pageContext, featureFlags, providerLogger]);

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red', fontWeight: 'bold' }}>
        Failed to initialize application context: {error.message}
      </div>
    );
  }

  if (!context) {
    return (
      <div style={{ padding: '20px', color: '#666' }}>
        Initializing application...
      </div>
    );
  }

  return (
    <SharedContext.Provider value={context}>
      {children}
    </SharedContext.Provider>
  );
};

/**
 * Hook to use shared context in plugins
 * Throws if used outside of SharedContextProvider
 */
export const useSharedContext = (): ISharedContext => {
  const context = useContext(SharedContext);

  if (!context) {
    throw new Error(
      'useSharedContext must be used within SharedContextProvider'
    );
  }

  return context;
};

/**
 * Export the context itself for direct access if needed
 */
export { SharedContext };
