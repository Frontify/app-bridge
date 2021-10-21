import appBridgeIframe from "./AppBridgeIframe";
import { AppBridgeIframe } from "./types";
export { AppBridgeNative } from "./AppBridgeNative";

export * from "./types";
export * from "./react";
export * from "./utilities";

export const createIframeAppBridge = (): AppBridgeIframe => {
    return appBridgeIframe;
};
