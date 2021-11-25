import appBridgeIframe from "./AppBridgeIframe";
import { AppBridgeIframe } from "./types";
export { AppBridgeNative } from "./AppBridgeNative";
export { AppBridgeNativeMock } from "./AppBridgeNativeMock";
export { IAppBridgeNative } from "./IAppBridgeNative";
export * from "./react";
export * from "./types";
export * from "./utilities";

export const createIframeAppBridge = (): AppBridgeIframe => {
    return appBridgeIframe;
};
