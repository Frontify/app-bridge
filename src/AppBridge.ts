import Messenger, { AppBridgeResponse } from "./Messenger";
import { DispatchKey, FetchKey } from "./Actions";
import { Asset, ThirdPartyOAuth2Token } from "./ResponseType";
import { PostExternalAssetParams } from "./RequestType";

export { DispatchKey, FetchKey } from "./Actions";

import PackageJson from "../package.json";
export const version = PackageJson.version;

export default class AppBridge {
    private messenger: Messenger;
    private static OAUTH2_TIMEOUT = 5 * 60 * 1000;

    constructor() {
        this.messenger = new Messenger();
    }

    public closeApp(): void {
        this.dispatch(DispatchKey.DispatchCloseApp);
    }

    public async getAppState<T>(): Promise<AppBridgeResponse<T>> {
        return this.fetch<T, T>(FetchKey.GetAppState);
    }

    public async getThirdPartyOAuth2Token(): Promise<AppBridgeResponse<ThirdPartyOAuth2Token>> {
        const token = this.messenger.getMessageToken();
        this.messenger.postMessage({ key: FetchKey.GetThirdPartyOauth2Token, token });

        return this.messenger.subscribeResponse<ThirdPartyOAuth2Token>(
            FetchKey.GetThirdPartyOauth2Token,
            token,
            AppBridge.OAUTH2_TIMEOUT,
        );
    }

    public async putAppState<T>(state: T): Promise<AppBridgeResponse<T>> {
        return this.fetch<T, T>(FetchKey.PutAppState, state);
    }

    public async postExternalAsset(asset: PostExternalAssetParams): Promise<AppBridgeResponse<Asset>> {
        return this.fetch<PostExternalAssetParams, Asset>(FetchKey.PostExternalAsset, asset);
    }

    private dispatch(key: DispatchKey): void {
        const token = this.messenger.getMessageToken();
        this.messenger.postMessage({ key, token });
    }

    private async fetch<RequestType, ResponseType>(
        key: FetchKey,
        data?: RequestType,
    ): Promise<AppBridgeResponse<ResponseType>> {
        const token = this.messenger.getMessageToken();
        this.messenger.postMessage<RequestType>({ key, token, data });

        return this.messenger.subscribeResponse<ResponseType>(key, token);
    }
}
