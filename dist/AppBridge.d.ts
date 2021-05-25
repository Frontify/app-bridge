import { AppBridgeResponse } from "./Messenger";
import { Asset, ThirdPartyOAuth2Token } from "./ResponseType";
import { PostExternalAssetParams } from "./RequestType";
export { DispatchKey, FetchKey } from "./Actions";
export declare const version: any;
export default class AppBridge {
    private messenger;
    private static OAUTH2_TIMEOUT;
    constructor();
    closeApp(): void;
    getAppState<T>(): Promise<AppBridgeResponse<T>>;
    getThirdPartyOAuth2Token(): Promise<AppBridgeResponse<ThirdPartyOAuth2Token>>;
    putAppState<T>(state: T): Promise<AppBridgeResponse<T>>;
    deleteAppState(): Promise<AppBridgeResponse<null>>;
    postExternalAsset(asset: PostExternalAssetParams): Promise<AppBridgeResponse<Asset>>;
    private dispatch;
    private fetch;
}
