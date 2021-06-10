import { DispatchKey, FetchKey } from "./Actions";
export interface CrossDocumentMessage<T = Record<string, unknown>> {
    key: DispatchKey | FetchKey;
    token: string;
    data?: T;
}
export interface CrossDocumentMessageResponse<T> {
    success: boolean;
    key: DispatchKey | FetchKey;
    token: string;
    data?: T;
}
export interface AppBridgeResponse<T> {
    success: boolean;
    data?: T;
}
export default class Messenger {
    private readonly tokenLength;
    getMessageToken(): string;
    postMessage<T>(message: CrossDocumentMessage<T>): void;
    subscribeResponse<T>(key: FetchKey, token: string, timeout: number): Promise<AppBridgeResponse<T>>;
}
