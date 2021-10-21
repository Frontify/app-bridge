import { AppBridge, AppBridgeAppState, AppBridgeAssets, AppBridgeAuth, AppBridgeContext, AppBridgeUtilities } from ".";

export interface AppBridgeIframe extends AppBridge {
    appState: AppBridgeAppState;
    assets: AppBridgeAssets;
    auth: AppBridgeAuth;
    context: AppBridgeContext;
    utilities: AppBridgeUtilities;
}
