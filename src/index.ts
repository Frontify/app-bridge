import AppBridgeIframe from "./AppBridgeIframe";
import AppBridgeNative from "./AppBridgeNative";

export { version } from "../package.json";

export const createNativeAppBridge = (): AppBridgeNative => {
    return new AppBridgeNative();
};

export const createIframeAppBridge = (): AppBridgeIframe => {
    return new AppBridgeIframe();
};
