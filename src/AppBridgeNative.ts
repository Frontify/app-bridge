import type { Asset, PostExternalAssetParams } from "./types";
import type {
    AppBridge,
    AppBridgeAssets,
    AppBridgeBlock,
    AppBridgeContext,
    AppBridgeUtilities,
} from "./types/AppBridge";
import { TerrificEvent } from "./types/TerrificEvent";
import { getJqueryDataByElement, getJqueryDatasetByClassName } from "./utilities/jquery";

export interface AppBridgeNative extends AppBridge {
    assets: AppBridgeAssets;
    block: AppBridgeBlock;
    context: AppBridgeContext;
}

const assets: AppBridgeAssets = {
    getAssetById(assetId: number): Promise<Asset> {
        return new Promise(async (resolve) => {
            const response = await window.fetch(`/api/asset/${assetId}`, {
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
                return resolve(true);
            } else {
                throw new Error("Could not update the block settings");
            }
        });
    },

    async postExternalAsset(asset: PostExternalAssetParams): Promise<Asset> {
        console.log(asset);
        return {} as Asset;
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

    getBlockSettings<T>(element: HTMLElement): Promise<T> {
        console.log(element);
        return new Promise((r) => r({} as unknown as T));
    },

    updateBlockSettings(element: HTMLElement, newSettings: Record<string, unknown>): Promise<boolean> {
        const pageId = getJqueryDatasetByClassName("page").id;
        if (!pageId) {
            throw new Error("Page ID not found");
        }

        const sectionId = getJqueryDataByElement(element).id;
        const blockId = this.getBlockId(element);

        const { translationLanguage } = getJqueryDataByElement(document.body);

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
                return resolve(true);
            } else {
                throw new Error("Could not update the block settings");
            }
        });
    },
};

const context: AppBridgeContext = {
    getProjectId: (): Promise<number> => {
        return Promise.resolve(window.application.config.context.project.id);
    },
};

const utilities: AppBridgeUtilities = {
    closeApp: () => {
        return;
    },

    openAssetChooser: (): void => {
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
    context,
    utilities,
};
