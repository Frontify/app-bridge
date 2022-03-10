import { AppBridge, AppBridgeAppState, AppBridgeAssets, AppBridgeAuth, AppBridgeUtilities } from '.';

export interface IAppBridgeIframe extends AppBridge {
    appState: AppBridgeAppState;
    assets: AppBridgeAssets;
    auth: AppBridgeAuth;
    utilities: AppBridgeUtilities;
}
