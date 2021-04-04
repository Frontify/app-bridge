import { allowedFetchKeys } from "./actions";
import FetchError from "./errors/FetchError";
import InvalidOriginError from "./errors/InvalidOriginError";
import TimeoutReachedError from "./errors/TimeoutReachedError";

export interface CrossDocumentMessage {
    key: string;
    token: string;
    data?: Record<string, unknown>;
}

export interface CrossDocumentMessageResponse {
    success: boolean;
    error?: string;
    data?: Record<string, unknown>;
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

    subscribeResponse(key: allowedFetchKeys, token: string, timeout = 3000): Promise<CrossDocumentMessageResponse> {
        return new Promise((resolve, reject) => {
            window.addEventListener(
                "message",
                (event) => {
                    const response = event.data;

                    if (response.token !== token || response.key !== key) {
                        return;
                    }

                    if (event.origin !== this.originUrl) {
                        reject(new InvalidOriginError());
                    }

                    response.success
                        ? resolve({
                              success: response.success,
                              data: response.data,
                          })
                        : reject(new FetchError(key));
                },
                { once: true },
            );

            setTimeout(() => {
                reject(new TimeoutReachedError(key));
            }, timeout);
        });
    }
}
