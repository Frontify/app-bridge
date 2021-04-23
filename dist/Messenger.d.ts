import { DispatchKey, FetchKey } from "./Actions";
export interface CrossDocumentMessage {
    key: DispatchKey | FetchKey;
    token: string;
    data?: Record<string, unknown>;
}
export interface CrossDocumentMessageResponse<T> {
    success: boolean;
    key: DispatchKey | FetchKey;
    token: string;
    data?: T;
}
export interface AppBridgeResponse<T> {
    success: boolean;
    error?: string;
    data?: T;
}
export default class Messenger {
    private readonly originUrl;
    private readonly tokenLength;
    constructor(originUrl: string);
    getMessageToken(): string;
    postMessage(message: CrossDocumentMessage): void;
    subscribeResponse<T>(key: FetchKey, token: string, timeout?: number): Promise<AppBridgeResponse<T>>;
}
