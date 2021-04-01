import { allowedFetchKeys } from "./actions";

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
                    if (event.origin !== this.originUrl || event.data.token !== token || event.data.key !== key) {
                        return;
                    }

                    resolve({
                        success: event.data.success,
                        data: event.data.data || null,
                        error: event.data.error || null,
                    });
                },
                { once: true },
            );

            setTimeout(() => {
                reject(`Invocation with key "${key}" not successful.`);
            }, timeout);
        });
    }
}
