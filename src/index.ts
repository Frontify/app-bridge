import appBridgeIframe from "./AppBridgeIframe";
import appBridgeNative from "./AppBridgeNative";
import { AppBridgeNative, AppBridgeIframe } from "./types";

export * from "./types";

export const createNativeAppBridge = (): AppBridgeNative => {
    if (!window.application.connectors.events.components.appBridge) {
        window.application.connectors.events.registerComponent({ id: "appBridge" });
    }
    return appBridgeNative;
};

export const createIframeAppBridge = (): AppBridgeIframe => {
    return appBridgeIframe;
};
