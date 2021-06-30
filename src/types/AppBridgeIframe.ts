import {
    AppBridge,
    AppBridgeAppState,
    AppBridgeAssets,
    AppBridgeAuth,
    AppBridgeContext,
    AppBridgeUtilities,
} from "./AppBridge";

export default interface AppBridgeIframe extends AppBridge {
    appState: AppBridgeAppState;
    assets: AppBridgeAssets;
    auth: AppBridgeAuth;
    context: AppBridgeContext;
    utilities: AppBridgeUtilities;
}
