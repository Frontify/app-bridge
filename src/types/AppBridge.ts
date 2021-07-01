import type { Asset, OauthTokens, PostExternalAssetParams } from ".";

export interface AppBridgeAppState {
    getAppState: <T = Record<string, unknown>>() => Promise<T>;
    updateAppState: <T = Record<string, unknown>>(newState: T) => Promise<boolean>;
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
    getBlockSettings: <T>(element: HTMLElement) => Promise<T>;
    updateBlockSettings: (element: HTMLElement, newSettings: Record<string, unknown>) => Promise<boolean>;
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

export enum Topic {
    CloseApp = "closeApp",
    DeleteAppState = "deleteAppState",
    GetAppState = "getAppState",
    GetAssetById = "getAssetById",
    GetProjectId = "getProjectId",
    GetRefreshedThirdpartyOauth2Token = "getRefreshedThirdpartyOauth2Token",
    GetThirdPartyOauth2Token = "getThirdPartyOAuth2Token",
    OpenAssetChooser = "openAssetChooser",
    PostExternalAsset = "postExternalAsset",
    PutAppState = "putAppState",
    UpdateAppState = "updateAppState",
}
