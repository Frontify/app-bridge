import Communicator from "./communicator";
import { ALLOWED_FETCH_KEYS } from "./constants";

export default class AppBridge {
    private communicator: Communicator;

    constructor(originUrl: string) {
        this.communicator = new Communicator(originUrl);
    }

    fetch(key: string, data?: object): Promise<object> {
        return new Promise((resolve, reject) => {
            if (!ALLOWED_FETCH_KEYS.includes(key)) {
                reject(`Method key "${key}" not allowed. Please check out ALLOWED_METHOD_KEYS.`);
            }

            const token = this.communicator.getMessageToken();
            this.communicator.postMessage({ key, token, data });
        });
    }
}
