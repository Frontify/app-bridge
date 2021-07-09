import { TerrificEvent } from "./types/TerrificEvent";

export declare global {
    interface Window {
        styleguideSettings: Record<string, string>;
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
