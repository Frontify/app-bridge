import { OauthTokens } from "./OauthTokens";

export interface AppBridgeAppState {
    getAppState: <T = Record<string, unknown>>() => Promise<T>;
    updateAppState: <T = Record<string, unknown>>(newState: T) => Promise<boolean>;
    deleteAppState: () => Promise<boolean>;
}

export interface AppBridgeAssets {
    postExternalAsset: (asset: any) => Promise<void>;
    openAssetChooser: () => void;
    getAssetById: (assetId: number) => any;
}

export interface AppBridgeAuth {
    getThirdPartyOauth2Tokens: () => Promise<OauthTokens>;
    getRefreshedThirdpartyOauth2Tokens: (refreshToken: string) => Promise<OauthTokens>;
}

export interface AppBridgeBlock {
    getBlockId: () => number;
    getBlockSettings: <T>() => Promise<T>;
    updateBlockSettings: (newSettings: Record<string, unknown>) => Promise<boolean>;
}

export interface AppBridgeContext {
    getProjectId: () => number;
}

export interface AppBridgeUtilities {
    closeApp: () => void;
}

export interface AppBridge {
    assets: AppBridgeAssets;
    context: AppBridgeContext;
}

export enum Topic {
    CloseApp = "closeApp",
    DeleteAppState = "deleteAppState",
    GetAppState = "getAppState",
    GetRefreshedThirdpartyOauth2Token = "getRefreshedThirdpartyOauth2Token",
    GetThirdPartyOauth2Token = "getThirdPartyOAuth2Token",
    PostExternalAsset = "postExternalAsset",
    PutAppState = "putAppState",
    UpdateAppState = "updateAppState",
}
