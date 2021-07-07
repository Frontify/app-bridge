export declare type NotifyOptions = {
    origin?: string;
};
export declare type NotifyData<T = Record<string, unknown>> = T;
export default function notify<T>(topic: string, token: string, data?: NotifyData<T>, options?: NotifyOptions): void;
