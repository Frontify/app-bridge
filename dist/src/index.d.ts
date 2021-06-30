import { AppBridgeNative, AppBridgeIframe } from "./types";
export declare const version: string;
export * from "./types";
export declare const createNativeAppBridge: () => AppBridgeNative;
export declare const createIframeAppBridge: () => AppBridgeIframe;
