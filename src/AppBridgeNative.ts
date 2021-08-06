import type { Asset, PostExternalAssetParams, AppBridgeNative } from "./types";
import type {
    AppBridgeAssets,
    AppBridgeBlock,
    AppBridgeColors,
    AppBridgeContext,
    AppBridgeUtilities,
} from "./types/AppBridge";
import Color from "./types/Color";
import ColorPalette from "./types/ColorPalette";
import { TerrificEvent } from "./types/TerrificEvent";
import { getJqueryDataByElement, getJqueryDatasetByClassName } from "./utilities/jquery";

const assets: AppBridgeAssets = {
    getAssetById(assetId: number): Promise<Asset> {
        return Promise.resolve({ assetId } as unknown as Asset);
    },

    async postExternalAssets(asset: PostExternalAssetParams[]): Promise<Asset[]> {
        return [{ asset }] as unknown as Asset[];
    },
};

const colors: AppBridgeColors = {
    async getColorsByIds(colorIds: number[]): Promise<Color[]> {
        const response = await window.application.config.data.get<{ success: boolean; palettes: ColorPalette[] }>(
            `/api/color/library/${window.application.config.context.project.id}`,
        );

        return response.palettes
            .reduce((previous, current): Color[] => previous.concat(current.colors), <Color[]>[])
            .filter((color) => colorIds.includes(Number(color.id)));
    },

    async getAvailableColors(): Promise<Color[]> {
        const response = await window.application.config.data.get<{ success: boolean; palettes: ColorPalette[] }>(
            `/api/color/library/${window.application.config.context.project.id}`,
        );

        return response.palettes.reduce((previous, current): Color[] => previous.concat(current.colors), <Color[]>[]);
    },
};

const block: AppBridgeBlock = {
    getBlockId(element: HTMLElement): number {
        const $parent = element.closest("div[data-block]");
        const parentDivBlockId = parseInt($parent?.getAttribute("data-block") || "0");

        if ($parent || parentDivBlockId > 0) {
            return parentDivBlockId;
        }

        throw new Error("Block's parent div not found.");
    },

    getBlockSettings<T = Record<string, unknown>>(element: HTMLElement): T {
        const blockId = this.getBlockId(element);
        const blockSettings = window.blockSettings[blockId];

        if (!blockSettings) {
            throw new Error(`Could not find settings for block ${blockId}`);
        }

        return blockSettings as T;
    },

    updateBlockSettings(element: HTMLElement, newSettings: Record<string, unknown>): Promise<boolean> {
        const pageId = getJqueryDatasetByClassName("page").id;
        if (!pageId) {
            throw new Error("Page ID not found");
        }

        const sectionId = getJqueryDataByElement(element).id;
        const blockId = this.getBlockId(element);

        const { translationLanguage } = getJqueryDataByElement(document.body);

        if (JSON.stringify(this.getBlockSettings(element)) === JSON.stringify(newSettings)) {
            console.log("You have the same settings, skipping call...");
            return Promise.resolve(true);
        }

        return new Promise(async (resolve) => {
            const response = await window.fetch(`/api/document/block/${pageId}/${sectionId}/${blockId}`, {
                method: "POST",
                headers: {
                    "x-csrf-token": (document.getElementsByName("x-csrf-token")[0] as HTMLMetaElement).content,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    settings: newSettings,
                    ...(translationLanguage ? { language: translationLanguage } : {}),
                }),
            });

            const responseJson = await response.json();
            if (responseJson.success) {
                window.blockSettings[blockId] = newSettings;
                return resolve(true);
            } else {
                throw new Error("Could not update the block settings");
            }
        });
    },
};

const context: AppBridgeContext = {
    getEditorState: (): boolean => {
        return document.body.classList.contains("editor-enabled");
    },
    getProjectId: (): number => {
        return window.application.config.context.project.id;
    },
};

const utilities: AppBridgeUtilities = {
    closeApp: () => {
        return;
    },

    openAssetChooser: (callback: (data: unknown) => void): void => {
        window.application.connectors.events.components.appBridge.component.onAssetChooserAssetChosen = callback;

        const $assetChooser = window.application.sandbox.config.tpl.render("c-assetchooser", {});
        window.application.connectors.events.notify(null, TerrificEvent.OpenModal, {
            modifier: "flex",
            $content: $assetChooser,
        });
    },
};

export default <AppBridgeNative>{
    assets,
    block,
    colors,
    context,
    utilities,
};
