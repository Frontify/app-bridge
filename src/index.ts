import appBridgeIframe from "./AppBridgeIframe";
import { AppBridgeNative } from "./AppBridgeNative";
import { AppBridgeIframe } from "./types";

export * from "./types";

export const appBridgeNative = AppBridgeNative;

export const createIframeAppBridge = (): AppBridgeIframe => {
    return appBridgeIframe;
};
