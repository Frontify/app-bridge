import { AppBridge, AppBridgeAssets, AppBridgeBlock, AppBridgeColors, AppBridgeContext } from "./AppBridge";

export default interface AppBridgeNative extends AppBridge {
    assets: AppBridgeAssets;
    colors: AppBridgeColors;
    block: AppBridgeBlock;
    context: AppBridgeContext;
}
