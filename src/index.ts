import Communicator, { CrossDocumentMessageResponse } from "./communicator";
import { allowedDispatchKeys, allowedFetchKeys } from "./actions";

export default class AppBridge {
    private communicator: Communicator;

    constructor(originUrl: string) {
        this.communicator = new Communicator(originUrl);
        this.dispatch("oAuth2Flow");
    }

    dispatch(key: allowedDispatchKeys): void {
        const token = this.communicator.getMessageToken();
        this.communicator.postMessage({ key, token });
    }

    fetch(key: allowedFetchKeys, data?: object): Promise<CrossDocumentMessageResponse> {
        return new Promise(() => {
            const token = this.communicator.getMessageToken();
            this.communicator.postMessage({ key, token, data });

            return this.communicator.subscribeResponse(key, token);
        });
    }
}
