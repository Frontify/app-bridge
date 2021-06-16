import { AppBridge, AppBridgeAssets, AppBridgeBlock, AppBridgeContext } from "./types/AppBridge";

const assets: AppBridgeAssets = {
    async postExternalAsset(asset: any): Promise<void> {
        console.log(asset);
    },

    openAssetChooser: (): void => {
        //
    },

    getAssetById(assetId: number): any {
        return { foo: assetId };
    },
};

const block: AppBridgeBlock = {
    getBlockId(): number {
        return 1;
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
    getProjectId: (): number => {
        return window.application.config.context.project.id;
    },
};

export default <AppBridge>{
    assets,
    block,
    context,
};
