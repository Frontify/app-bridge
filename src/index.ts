import appBridgeIframe, { AppBridgeIframe } from "./AppBridgeIframe";
import appBridgeNative, { AppBridgeNative } from "./AppBridgeNative";
import packageJson from "../package.json";

export const { version } = packageJson;
export * from "./types";

export const createNativeAppBridge = (): AppBridgeNative => {
    return appBridgeNative;
};

export const createIframeAppBridge = (): AppBridgeIframe => {
    return appBridgeIframe;
};
