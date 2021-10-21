import { Asset, OauthTokens, PostExternalAssetParams, Color } from ".";
import { NotifyData } from "../utilities/notify";

export type AppBridgeAppState = {
    getAppState: <T = Record<string, unknown>>() => Promise<T>;
    putAppState: (newState: NotifyData) => Promise<boolean>;
    deleteAppState: () => Promise<boolean>;
};

export type AppBridgeAssets = {
    getAssetById: (assetId: number) => Promise<Asset>;
    postExternalAssets: (asset: PostExternalAssetParams[]) => Promise<Asset[]>;
};

export type AppBridgeColors = {
    getColorsByIds(colorIds: number[]): Promise<Color[]>;
    getAvailableColors(): Promise<Color[]>;
};

export type AppBridgeAuth = {
    getThirdPartyOauth2Tokens: () => Promise<OauthTokens>;
    getRefreshedThirdpartyOauth2Tokens: (refreshToken: string) => Promise<OauthTokens>;
};

export type AppBridgeContext = {
    getEditorState: () => boolean;
    getProjectId: () => number;
};

export type AppBridgeUtilities = {
    closeApp: () => void;
    openAssetChooser: (callback: (data: unknown) => void) => void;
};

export type AppBridge = {
    assets: AppBridgeAssets;
    context: AppBridgeContext;
};
