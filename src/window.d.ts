import { TerrificEvent, AssetChooserAssetChosenCallback } from "./types/Terrific";

declare global {
    interface Window {
        APPLICATION_CONFIG: {
            version: string;
            bugsnagKey: string | null;
            webworker: {
                upload: string;
            };
        };
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
                                onTemplateChooserTemplateChosen: TemplateChooserTemplateChosenCallback;
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
                    context: {
                        project: {
                            id: number;
                        };
                    };
                };
            };
        };
    }
}

export {};
