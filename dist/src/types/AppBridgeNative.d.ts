import { AppBridge, AppBridgeAssets, AppBridgeBlock, AppBridgeContext } from "./AppBridge";
export default interface AppBridgeNative extends AppBridge {
    assets: AppBridgeAssets;
    block: AppBridgeBlock;
    context: AppBridgeContext;
}
