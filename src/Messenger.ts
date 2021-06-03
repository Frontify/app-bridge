import { DispatchKey, FetchKey } from "./Actions";
import TimeoutReachedError from "./errors/TimeoutReachedError";
import FetchError from "./errors/FetchError";

export interface CrossDocumentMessage<T = Record<string, unknown>> {
    key: DispatchKey | FetchKey;
    token: string;
    data?: T;
}

export interface CrossDocumentMessageResponse<T = Record<string, unknown>> {
    success: boolean;
    key: DispatchKey | FetchKey;
    token: string;
    data?: T;
}

export interface AppBridgeResponse<T> {
    success: boolean;
    data: T;
}

export default class Messenger {
    private readonly tokenLength: number = 6;

    public getMessageToken(): string {
        return Math.random().toString(20).substr(2, this.tokenLength);
    }

    public postMessage<T>(message: CrossDocumentMessage<T>): void {
        const parentWindow = window.top;
        parentWindow.postMessage(message, "*");
    }

    public subscribeResponse<T>(key: FetchKey, token: string, timeout: number): Promise<AppBridgeResponse<T>> {
        return new Promise((resolve, reject) => {
            const subscribeResponseCallback = (event: MessageEvent) => {
                const response: CrossDocumentMessageResponse<T> = event.data;

                if (response.token !== token || response.key !== key) {
                    return;
                }

                response.success && response.data
                    ? resolve({
                          success: response.success,
                          data: response.data,
                      })
                    : reject(new FetchError(key));

                window.removeEventListener("message", subscribeResponseCallback);
            };

            window.addEventListener("message", subscribeResponseCallback);

            setTimeout(() => {
                reject(new TimeoutReachedError(key));
            }, timeout);
        });
    }
}
