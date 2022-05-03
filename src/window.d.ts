/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetChooserAssetChosenCallback, TerrificEvent } from './types/Terrific';
import type { Emitter } from 'mitt';

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
                        brand: {
                            id: number;
                        };
                    };
                };
            };
        };
        emitter: Emitter<{
            StyleguideBlockAssetsUpdated: {
                blockId: number;
                blockAssets: Record<string, Asset[]>;
            };
        }>;
    }
}

declare namespace Cypress {
    interface AUTWindow {
        blockSettings: Record<number, Record<string, unknown>>;
        emitter: Emitter<{
            StyleguideBlockAssetsUpdated: {
                blockId: number;
                blockAssets: Record<string, Asset[]>;
            };
        }>;
    }
}

export {};
