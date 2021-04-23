import Messenger, { AppBridgeResponse } from "./Messenger";
import { DispatchKey, FetchKey } from "./Actions";
import { AppState, Asset } from "./ResponseType";

export { DispatchKey, FetchKey } from "./Actions";

export default class AppBridge {
    private messenger: Messenger;
    private static OAUTH2_TIMEOUT = 5 * 60 * 1000;

    constructor(originUrl: string) {
        this.messenger = new Messenger(originUrl);
    }

    public closeApp(): void {
        this.dispatch(DispatchKey.DispatchCloseApp);
    }

    public async getAppState(): Promise<AppBridgeResponse<AppState>> {
        return this.fetch<AppState>(FetchKey.GetAppState);
    }

    public async getThirdpartyOAuth2Token(): Promise<AppBridgeResponse<AppState>> {
        const token = this.messenger.getMessageToken();
        this.messenger.postMessage({ key: FetchKey.GetThirdpartyOauth2Token, token });

        return this.messenger.subscribeResponse<AppState>(
            FetchKey.GetThirdpartyOauth2Token,
            token,
            AppBridge.OAUTH2_TIMEOUT,
        );
    }

    public async putAppState(state: Record<string, unknown>): Promise<AppBridgeResponse<AppState>> {
        return this.fetch<AppState>(FetchKey.PutAppState, state);
    }

    public async postExternalAsset(asset: { url: string; title: string }): Promise<AppBridgeResponse<Asset>> {
        return this.fetch<Asset>(FetchKey.PostExternalAsset, asset);
    }

    private dispatch(key: DispatchKey): void {
        const token = this.messenger.getMessageToken();
        this.messenger.postMessage({ key, token });
    }

    private async fetch<T>(key: FetchKey, data?: Record<string, unknown>): Promise<AppBridgeResponse<T>> {
        const token = this.messenger.getMessageToken();
        this.messenger.postMessage({ key, token, data });

        return this.messenger.subscribeResponse<T>(key, token);
    }
}
