import type { Asset, OauthTokens, PostExternalAssetParams } from ".";
import { NotifyData } from "../utilities/notify";

export interface AppBridgeAppState {
    getAppState: <T = Record<string, unknown>>() => Promise<T>;
    putAppState: (newState: NotifyData) => Promise<boolean>;
    deleteAppState: () => Promise<boolean>;
}

export interface AppBridgeAssets {
    getAssetById: (assetId: number) => Promise<Asset>;
    postExternalAsset: (asset: PostExternalAssetParams) => Promise<Asset>;
}

export interface AppBridgeAuth {
    getThirdPartyOauth2Tokens: () => Promise<OauthTokens>;
    getRefreshedThirdpartyOauth2Tokens: (refreshToken: string) => Promise<OauthTokens>;
}

export interface AppBridgeBlock {
    getBlockId: (element: HTMLElement) => number;
    getBlockSettings: <T>() => Promise<T>;
    updateBlockSettings: (newSettings: Record<string, unknown>) => Promise<boolean>;
}

export interface AppBridgeContext {
    getProjectId: () => Promise<number>;
}

export interface AppBridgeUtilities {
    closeApp: () => void;
    openAssetChooser: () => void;
}

export interface AppBridge {
    assets: AppBridgeAssets;
    context: AppBridgeContext;
}
