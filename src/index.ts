import appBridgeIframe from "./AppBridgeIframe";
export { AppBridgeNative } from "./AppBridgeNative";
import { AppBridgeIframe } from "./types";

export * from "./types";

export const createIframeAppBridge = (): AppBridgeIframe => {
    return appBridgeIframe;
};
