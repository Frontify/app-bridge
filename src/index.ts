import Communicator, { CrossDocumentMessageResponse } from "./communicator";
import { allowedDispatchKeys, allowedFetchKeys, GET_THIRDPARTY_OAUTH2_TOKEN } from "./actions";

export default class AppBridge {
    private communicator: Communicator;
    private static OAUTH2_TIMEOUT = 5 * 60 * 1000;

    constructor(originUrl: string) {
        this.communicator = new Communicator(originUrl);
    }

    dispatch(key: allowedDispatchKeys): void {
        const token = this.communicator.getMessageToken();
        this.communicator.postMessage({ key, token });
    }

    fetch(key: allowedFetchKeys, data?: Record<string, unknown>): Promise<CrossDocumentMessageResponse> {
        return new Promise(() => {
            const token = this.communicator.getMessageToken();
            this.communicator.postMessage({ key, token, data });

            return this.communicator.subscribeResponse(key, token);
        });
    }

    getThirdpartyOAuth2Token(): Promise<CrossDocumentMessageResponse> {
        return new Promise(() => {
            const token = this.communicator.getMessageToken();
            this.communicator.postMessage({ key: GET_THIRDPARTY_OAUTH2_TOKEN, token });

            return this.communicator.subscribeResponse(GET_THIRDPARTY_OAUTH2_TOKEN, token, AppBridge.OAUTH2_TIMEOUT);
        });
    }
}
