import { AppBridgeResponse } from "./Messenger";
import { AppState, Asset } from "./ResponseType";
export { DispatchKey, FetchKey } from "./Actions";
export default class AppBridge {
    private messenger;
    private static OAUTH2_TIMEOUT;
    constructor(originUrl: string);
    closeApp(): void;
    getAppState(): Promise<AppBridgeResponse<AppState>>;
    getThirdpartyOAuth2Token(): Promise<AppBridgeResponse<AppState>>;
    putAppState(state: Record<string, unknown>): Promise<AppBridgeResponse<AppState>>;
    postExternalAsset(asset: {
        url: string;
        title: string;
    }): Promise<AppBridgeResponse<Asset>>;
    private dispatch;
    private fetch;
}
