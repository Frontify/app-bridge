import { TerrificEvent, AssetChooserAssetChosenCallback } from "./types/Terrific";

export declare global {
    interface Window {
        blockSettings: Record<number, Record<string, unknown>>;
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
                                onAssetChooserAssetChosen: AssetChooserAssetChosenCallback;
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
