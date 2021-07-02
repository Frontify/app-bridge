import { generateRandomString } from "./utilities/hash";
import notify, { NotifyData } from "./utilities/notify";
import subscribe from "./utilities/subscribe";
import type { AppBridgeAppState, AppBridgeAssets, AppBridgeAuth, AppBridgeUtilities } from "./types/AppBridge";
import type { PostExternalAssetParams, OauthTokens, Asset, AppBridgeIframe } from "./types";
import { Topic } from "./types";

const PUBSUB_TOKEN = generateRandomString();
const DEFAULT_TIMEOUT = 3 * 1000;
const OAUTH2_TIMEOUT = 5 * 60 * 1000;
const FILE_UPLOAD_TIMEOUT = 10 * 1000;

const appState: AppBridgeAppState = {
    getAppState<T = Record<string, unknown>>(): Promise<T> {
        notify(Topic.GetAppState, PUBSUB_TOKEN);
        return subscribe<T>(Topic.GetAppState, PUBSUB_TOKEN);
    },

    async putAppState(newState: NotifyData): Promise<boolean> {
        notify(Topic.PutAppState, PUBSUB_TOKEN, newState);
        return subscribe<boolean>(Topic.PutAppState, PUBSUB_TOKEN);
    },

    async deleteAppState(): Promise<boolean> {
        notify(Topic.DeleteAppState, PUBSUB_TOKEN);
        return subscribe<boolean>(Topic.DeleteAppState, PUBSUB_TOKEN);
    },
};

const assets: AppBridgeAssets = {
    getAssetById(assetId: number): Promise<Asset> {
        notify(Topic.GetAssetById, PUBSUB_TOKEN, { assetId });
        return subscribe<Asset>(Topic.GetAssetById, PUBSUB_TOKEN);
    },

    async postExternalAssets(assets: PostExternalAssetParams[]): Promise<Asset[]> {
        const assetsWithPreview = assets.filter((asset) => asset.previewUrl);
        const timeout = assetsWithPreview.length ? FILE_UPLOAD_TIMEOUT : DEFAULT_TIMEOUT;

        notify(Topic.PostExternalAssets, PUBSUB_TOKEN, { ...assets });
        return subscribe<Asset[]>(Topic.PostExternalAssets, PUBSUB_TOKEN, {
            timeout,
        });
    },
};

const auth: AppBridgeAuth = {
    getThirdPartyOauth2Tokens(): Promise<OauthTokens> {
        notify(Topic.GetThirdPartyOauth2Tokens, PUBSUB_TOKEN);
        return subscribe<OauthTokens>(Topic.GetThirdPartyOauth2Tokens, PUBSUB_TOKEN, {
            timeout: OAUTH2_TIMEOUT,
        });
    },

    getRefreshedThirdpartyOauth2Tokens(refreshToken: string): Promise<OauthTokens> {
        notify(Topic.GetRefreshedThirdpartyOauth2Token, PUBSUB_TOKEN, { refreshToken });
        return subscribe<OauthTokens>(Topic.GetRefreshedThirdpartyOauth2Token, PUBSUB_TOKEN);
    },
};

const utilities: AppBridgeUtilities = {
    closeApp(): void {
        notify(Topic.CloseApp, PUBSUB_TOKEN);
    },

    openAssetChooser: (): void => {
        notify(Topic.OpenAssetChooser, PUBSUB_TOKEN);
    },
};

export default <AppBridgeIframe>{
    appState,
    assets,
    auth,
    utilities,
};
