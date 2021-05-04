import { AppBridgeResponse } from "./Messenger";
import { Asset, ThirdPartyOAuth2Token } from "./ResponseType";
export { DispatchKey, FetchKey } from "./Actions";
export default class AppBridge {
    private messenger;
    private static OAUTH2_TIMEOUT;
    constructor();
    closeApp(): void;
    getAppState<T>(): Promise<AppBridgeResponse<T>>;
    getThirdPartyOAuth2Token(): Promise<AppBridgeResponse<ThirdPartyOAuth2Token>>;
    putAppState<T>(state: T): Promise<AppBridgeResponse<T>>;
    postExternalAsset(asset: Asset): Promise<AppBridgeResponse<Asset>>;
    private dispatch;
    private fetch;
}
