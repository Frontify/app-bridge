import type { AppBridge, AppBridgeAppState, AppBridgeAssets, AppBridgeAuth, AppBridgeContext, AppBridgeUtilities } from "./types/AppBridge";
export interface AppBridgeIframe extends AppBridge {
    appState: AppBridgeAppState;
    assets: AppBridgeAssets;
    auth: AppBridgeAuth;
    context: AppBridgeContext;
    utilities: AppBridgeUtilities;
}
declare const _default: AppBridgeIframe;
export default _default;
