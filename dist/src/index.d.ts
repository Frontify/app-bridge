import { AppBridgeIframe } from "./AppBridgeIframe";
import { AppBridgeNative } from "./AppBridgeNative";
export declare const version: string;
export * from "./types";
export declare const createNativeAppBridge: () => AppBridgeNative;
export declare const createIframeAppBridge: () => AppBridgeIframe;
