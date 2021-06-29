import type { AppBridge, AppBridgeAssets, AppBridgeBlock, AppBridgeContext } from "./types/AppBridge";
export interface AppBridgeNative extends AppBridge {
    assets: AppBridgeAssets;
    block: AppBridgeBlock;
    context: AppBridgeContext;
}
declare const _default: AppBridgeNative;
export default _default;
