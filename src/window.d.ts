import { TerrificEvent } from "./types/TerrificEvent";

export declare global {
    interface Window {
        blockSettings: Record<string, Record<string, unknown>>;
        application: {
            config: {
                context: {
                    project: {
                        id: number;
                    };
                };
                data: {
                    get: <T>(url: string) => Promise<T>;
                };
            };
            connectors: {
                events: {
                    components: {
                        [key: string]: {
                            component: {
                                onAssetChooserAssetChosen: (callback: (data: unknown) => void) => void;
                            };
                        };
                    };
                    notify: <T = Record<string, unknown>>(
                        something: null,
                        eventName: TerrificEvent,
                        options: T,
                    ) => void;
                    registerComponent: (component: { id: string }) => void;
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
