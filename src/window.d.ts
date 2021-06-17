import { TerrificEvent } from "./types/TerrificEvent";

export declare global {
    interface Window {
        application: {
            config: {
                context: {
                    project: {
                        id: number;
                    };
                };
            };
            connectors: {
                events: {
                    notify: <T = Record<string, unknown>>(
                        something: null,
                        eventName: TerrificEvent,
                        options: T,
                    ) => void;
                };
            };
            sandbox: {
                config: {
                    tpl: {
                        render: (templateName: string, props: Record<string, unknown>) => string;
                    };
                };
            };
        };
    }
}
