import Messenger, { AppBridgeResponse } from "./Messenger";
import { DispatchKey, FetchKey } from "./Actions";
import { Asset, ThirdPartyOAuth2Token } from "./ResponseType";
import { GetRefreshedThirdpartyOauth2TokenParams, PostExternalAssetParams } from "./RequestType";

export { DispatchKey, FetchKey } from "./Actions";
export { CrossDocumentMessage, CrossDocumentMessageResponse } from "./Messenger";

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const version = require("../package.json").version;

interface FetchParams<T> {
    key: FetchKey;
    timeout?: number;
    data?: T;
}
export default class AppBridge {
    private messenger: Messenger;
    private static DEFAULT_TIMEOUT = 3 * 1000;
    private static FILE_UPLOAD_TIMEOUT = 10 * 1000;
    private static OAUTH2_TIMEOUT = 5 * 60 * 1000;

    constructor() {
        this.messenger = new Messenger();
    }

    public closeApp(): void {
        this.dispatch(DispatchKey.DispatchCloseApp);
    }

    public async getAppState<T>(): Promise<AppBridgeResponse<T>> {
        return this.fetch<T, T>({ key: FetchKey.GetAppState });
    }

    public async getThirdPartyOAuth2Token(): Promise<AppBridgeResponse<ThirdPartyOAuth2Token>> {
        return this.fetch<null, ThirdPartyOAuth2Token>({
            key: FetchKey.GetThirdPartyOauth2Token,
            timeout: AppBridge.OAUTH2_TIMEOUT,
        });
    }

    public async getRefreshedThirdpartyOauth2Token(
        refreshToken: GetRefreshedThirdpartyOauth2TokenParams,
    ): Promise<AppBridgeResponse<ThirdPartyOAuth2Token>> {
        return this.fetch<GetRefreshedThirdpartyOauth2TokenParams, ThirdPartyOAuth2Token>({
            key: FetchKey.GetRefreshedThirdpartyOauth2Token,
            data: refreshToken,
        });
    }

    public async putAppState<T>(state: T): Promise<AppBridgeResponse<T>> {
        return this.fetch<T, T>({ key: FetchKey.PutAppState, data: state });
    }

    public async deleteAppState(): Promise<AppBridgeResponse<null>> {
        return this.fetch<null, null>({ key: FetchKey.DeleteAppState });
    }

    public async postExternalAsset(asset: PostExternalAssetParams): Promise<AppBridgeResponse<Asset>> {
        const timeout = asset.previewUrl ? AppBridge.FILE_UPLOAD_TIMEOUT : AppBridge.DEFAULT_TIMEOUT;
        return this.fetch<PostExternalAssetParams, Asset>({ key: FetchKey.PostExternalAsset, timeout, data: asset });
    }

    private dispatch(key: DispatchKey): void {
        const token = this.messenger.getMessageToken();
        this.messenger.postMessage({ key, token });
    }

    private async fetch<RequestType, ResponseType>({
        key,
        timeout = AppBridge.DEFAULT_TIMEOUT,
        data = undefined,
    }: FetchParams<RequestType>): Promise<AppBridgeResponse<ResponseType>> {
        const token = this.messenger.getMessageToken();
        this.messenger.postMessage<RequestType>({ key, token, data });

        return this.messenger.subscribeResponse<ResponseType>(key, token, timeout);
    }
}
