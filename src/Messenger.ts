import { DispatchKey, FetchKey } from "./Actions";
import InvalidOriginError from "./errors/InvalidOriginError";
import TimeoutReachedError from "./errors/TimeoutReachedError";
import FetchError from "./errors/FetchError";

export interface CrossDocumentMessage {
    key: DispatchKey | FetchKey;
    token: string;
    data?: Record<string, unknown>;
}

export interface CrossDocumentMessageResponse extends CrossDocumentMessage {
    success: boolean;
}

export interface AppBridgeResponse {
    success: boolean;
    error?: string;
    data?: Record<string, unknown>;
}

export default class Messenger {
    private readonly originUrl: string;
    private readonly tokenLength: number = 6;

    constructor(originUrl: string) {
        this.originUrl = originUrl;
    }

    getMessageToken(): string {
        return Math.random().toString(20).substr(2, this.tokenLength);
    }

    postMessage(message: CrossDocumentMessage): void {
        const parentWindow = window.top;
        parentWindow.postMessage(message, this.originUrl);
    }

    subscribeResponse(key: FetchKey, token: string, timeout = 3000): Promise<AppBridgeResponse> {
        return new Promise((resolve, reject) => {
            window.addEventListener(
                "message",
                (event) => {
                    const response: CrossDocumentMessageResponse = event.data;

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
