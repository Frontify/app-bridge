import appBridgeIframe from "./AppBridgeIframe";
import appBridgeNative from "./AppBridgeNative";
import packageJson from "../package.json";
import { AppBridgeNative, AppBridgeIframe } from "./types";

export const { version } = packageJson;
export * from "./types";

export const createNativeAppBridge = (): AppBridgeNative => {
    return appBridgeNative;
};

export const createIframeAppBridge = (): AppBridgeIframe => {
    return appBridgeIframe;
};
