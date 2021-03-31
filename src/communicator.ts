import { REQUEST_TIMEOUT } from "./constants";

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
}
