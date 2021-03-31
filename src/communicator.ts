import { REQUEST_TIMEOUT } from "./constants";
import { allowedFetchKeys } from "./actions";

export interface CrossDocumentMessage {
    key: string;
    token: string;
    data?: object;
}

export interface CrossDocumentMessageResponse {
    success: boolean;
    data?: { error?: string };
}

export default class Communicator {
    private readonly originUrl: string;

    constructor(originUrl: string) {
        this.originUrl = originUrl;
    }

    getMessageToken(): string {
        return Math.random().toString(20).substr(2, 6);
    }

    postMessage(message: CrossDocumentMessage): void {
        const parentWindow = window.top;
        parentWindow.postMessage(message, this.originUrl);
    }

    subscribeResponse(key: allowedFetchKeys, token: string): Promise<CrossDocumentMessageResponse> {
        return new Promise((resolve, reject) => {
            window.addEventListener(
                "message",
                (event) => {
                    if (event.origin !== this.originUrl || event.data.token !== token || event.data.key !== key) {
                        return;
                    }

                    resolve({
                        success: event.data.success,
                        data: event.data.data,
                    });
                },
                { once: true },
            );

            setTimeout(() => {
                reject(`Invocation with key "${key}" not successful.`);
            }, REQUEST_TIMEOUT);
        });
    }
}
