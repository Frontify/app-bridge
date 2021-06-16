export type NotifyOptions = {
    origin?: string;
};

export type NotifyData = Record<string, unknown> | string;

export default function notify(topic: string, token: string, data?: NotifyData, options?: NotifyOptions): void {
    const parentWindow = window.top;
    parentWindow.postMessage(
        {
            topic,
            token,
            data,
        },
        options?.origin || "*",
    );
}
