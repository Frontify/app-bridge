import type { Asset, OauthTokens, PostExternalAssetParams, Color } from ".";
import { NotifyData } from "../utilities/notify";

export interface AppBridgeAppState {
    getAppState: <T = Record<string, unknown>>() => Promise<T>;
    putAppState: (newState: NotifyData) => Promise<boolean>;
    deleteAppState: () => Promise<boolean>;
}

export interface AppBridgeAssets {
    getAssetById: (assetId: number) => Promise<Asset>;
    postExternalAssets: (asset: PostExternalAssetParams[]) => Promise<Asset[]>;
}

export interface AppBridgeColors {
    getColorsByIds(colorIds: number[]): Promise<Color[]>;
    getAvailableColors(): Promise<Color[]>;
}

export interface AppBridgeAuth {
    getThirdPartyOauth2Tokens: () => Promise<OauthTokens>;
    getRefreshedThirdpartyOauth2Tokens: (refreshToken: string) => Promise<OauthTokens>;
}

export interface AppBridgeBlock {
    getBlockId: (element: HTMLElement) => number;
    getBlockSettings: <T = Record<string, unknown>>(element: HTMLElement) => T;
    updateBlockSettings: (element: HTMLElement, newSettings: Record<string, unknown>) => Promise<boolean>;
}

export interface AppBridgeContext {
    getEditorState: () => boolean;
    getProjectId: () => number;
}

export interface AppBridgeUtilities {
    closeApp: () => void;
    openAssetChooser: (callback: (data: unknown) => void) => void;
}

export interface AppBridge {
    assets: AppBridgeAssets;
    context: AppBridgeContext;
}
