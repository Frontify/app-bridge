import { DispatchKey, FetchKey } from "./Actions";
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
    private readonly originUrl;
    private readonly tokenLength;
    constructor(originUrl: string);
    getMessageToken(): string;
    postMessage(message: CrossDocumentMessage): void;
    subscribeResponse(key: FetchKey, token: string, timeout?: number): Promise<AppBridgeResponse>;
}
