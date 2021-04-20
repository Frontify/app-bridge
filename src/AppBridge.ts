import { Messenger, AppBridgeResponse } from "./Messenger";
import { FetchKey, DispatchKey } from "./Actions";

export class AppBridge {
    private messenger: Messenger;
    private static OAUTH2_TIMEOUT = 5 * 60 * 1000;

    constructor(originUrl: string) {
        this.messenger = new Messenger(originUrl);
    }

    public dispatch(key: FetchKey | DispatchKey): void {
        this.messenger.postMessage({ key, token: this.messenger.getMessageToken() });
    }

    public async fetch(key: FetchKey, data?: Record<string, unknown>): Promise<AppBridgeResponse> {
        const token = this.messenger.getMessageToken();
        this.messenger.postMessage({ key, token, data });
        return this.messenger.subscribeResponse(key, token);
    }

    public async fetchThirdpartyOAuth2Token(): Promise<AppBridgeResponse> {
        const token = this.messenger.getMessageToken();
        this.messenger.postMessage({ key: FetchKey.GetThirdpartyOauth2Token, token });
        return this.messenger.subscribeResponse(FetchKey.GetThirdpartyOauth2Token, token, AppBridge.OAUTH2_TIMEOUT);
    }
}
