import Messenger, { AppBridgeResponse } from "./Messenger";
import { DispatchKey, FetchKey } from "./Actions";

export default class AppBridge {
    private messenger: Messenger;
    private static OAUTH2_TIMEOUT = 5 * 60 * 1000;

    constructor(originUrl: string) {
        this.messenger = new Messenger(originUrl);
    }

    dispatch(key: DispatchKey): void {
        const token = this.messenger.getMessageToken();
        this.messenger.postMessage({ key, token });
    }

    fetch(key: FetchKey, data?: Record<string, unknown>): Promise<AppBridgeResponse> {
        return new Promise((resolve, reject) => {
            const token = this.messenger.getMessageToken();
            this.messenger.postMessage({ key, token, data });

            try {
                resolve(this.messenger.subscribeResponse(key, token));
            } catch (error) {
                reject(error);
            }
        });
    }

    fetchThirdpartyOAuth2Token(): Promise<AppBridgeResponse> {
        return new Promise((resolve, reject) => {
            const token = this.messenger.getMessageToken();
            this.messenger.postMessage({ key: FetchKey.GetThirdpartyOauth2Token, token });

            try {
                resolve(
                    this.messenger.subscribeResponse(
                        FetchKey.GetThirdpartyOauth2Token,
                        token,
                        AppBridge.OAUTH2_TIMEOUT,
                    ),
                );
            } catch (error) {
                reject(error);
            }
        });
    }
}
