import { AppBridgeResponse } from "./Messenger";
import { Asset, ThirdPartyOAuth2Token } from "./ResponseType";
import { GetRefreshedThirdpartyOauth2TokenParams, PostExternalAssetParams } from "./RequestType";
export { CrossDocumentMessage, CrossDocumentMessageResponse } from "./Messenger";
export { PostExternalAssetParams, GetRefreshedThirdpartyOauth2TokenParams } from "./RequestType";
export declare const version: any;
export default class AppBridge {
    private messenger;
    private static DEFAULT_TIMEOUT;
    private static FILE_UPLOAD_TIMEOUT;
    private static OAUTH2_TIMEOUT;
    constructor();
    closeApp(): void;
    getAppState<T>(): Promise<AppBridgeResponse<T>>;
    getThirdPartyOAuth2Token(): Promise<AppBridgeResponse<ThirdPartyOAuth2Token>>;
    getRefreshedThirdpartyOauth2Token(refreshToken: GetRefreshedThirdpartyOauth2TokenParams): Promise<AppBridgeResponse<ThirdPartyOAuth2Token>>;
    putAppState<T>(state: T): Promise<AppBridgeResponse<T>>;
    deleteAppState(): Promise<AppBridgeResponse<null>>;
    postExternalAsset(asset: PostExternalAssetParams): Promise<AppBridgeResponse<Asset>>;
    private dispatch;
    private fetch;
}
