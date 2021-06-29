export declare type NotifyOptions = {
    origin?: string;
};
export declare type NotifyData = Record<string, unknown>;
export default function notify(topic: string, token: string, data?: NotifyData, options?: NotifyOptions): void;
