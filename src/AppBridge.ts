import Messenger, { AppBridgeResponse } from "./Messenger";
import { DispatchKey, FetchKey } from "./Actions";
import { Asset, ThirdPartyOAuth2Token } from "./ResponseType";

export { DispatchKey, FetchKey } from "./Actions";

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
        return this.fetch<T>(FetchKey.GetAppState);
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
        return this.fetch<T>(FetchKey.PutAppState, state);
    }

    public async postExternalAsset(asset: Asset): Promise<AppBridgeResponse<Asset>> {
        return this.fetch<Asset>(FetchKey.PostExternalAsset, asset);
    }

    private dispatch(key: DispatchKey): void {
        const token = this.messenger.getMessageToken();
        this.messenger.postMessage({ key, token });
    }

    private async fetch<T>(key: FetchKey, data?: T): Promise<AppBridgeResponse<T>> {
        const token = this.messenger.getMessageToken();
        this.messenger.postMessage<T>({ key, token, data });

        return this.messenger.subscribeResponse<T>(key, token);
    }
}
