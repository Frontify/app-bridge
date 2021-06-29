import type { Asset, PostExternalAssetParams } from "./types";
import type {
    AppBridge,
    AppBridgeAssets,
    AppBridgeBlock,
    AppBridgeContext,
    AppBridgeUtilities,
} from "./types/AppBridge";
import { TerrificEvent } from "./types/TerrificEvent";

export interface AppBridgeNative extends AppBridge {
    assets: AppBridgeAssets;
    block: AppBridgeBlock;
    context: AppBridgeContext;
}

const assets: AppBridgeAssets = {
    async postExternalAsset(asset: PostExternalAssetParams): Promise<Asset> {
        console.log(asset);
        return {} as Asset;
    },

    getAssetById(assetId: number): any {
        return { foo: assetId };
    },
};

const block: AppBridgeBlock = {
    getBlockId(element: HTMLElement): number {
        const parentDiv = element.closest("div[data-block]");
        const parentDivBlockId = parseInt(parentDiv?.getAttribute("data-block") || "0");

        if (parentDiv || parentDivBlockId > 0) {
            return parentDivBlockId;
        }

        throw new Error("Block's parent div not found.");
    },

    getBlockSettings<T>(): Promise<T> {
        return new Promise((r) => r({} as unknown as T));
    },

    updateBlockSettings(newSettings: Record<string, unknown>): Promise<boolean> {
        console.log(newSettings);
        return new Promise((r) => r(true));
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
