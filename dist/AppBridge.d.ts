import { AppBridgeResponse } from "./Messenger";
import { Asset, ThirdpartyOAuth2Token } from "./ResponseType";
export { DispatchKey, FetchKey } from "./Actions";
export default class AppBridge {
    private messenger;
    private static OAUTH2_TIMEOUT;
    constructor(originUrl: string);
    closeApp(): void;
    getAppState<T>(): Promise<AppBridgeResponse<T>>;
    getThirdpartyOAuth2Token(): Promise<AppBridgeResponse<ThirdpartyOAuth2Token>>;
    putAppState<T>(state: T): Promise<AppBridgeResponse<T>>;
    postExternalAsset(asset: Asset): Promise<AppBridgeResponse<Asset>>;
    private dispatch;
    private fetch;
}
