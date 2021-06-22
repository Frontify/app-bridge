import { Topic } from "./types/AppBridge";
import { generateRandomString } from "./utilities/hash";
import notify from "./utilities/notify";
import subscribe from "./utilities/subscribe";
import type {
    AppBridge,
    AppBridgeAppState,
    AppBridgeAssets,
    AppBridgeAuth,
    AppBridgeContext,
    AppBridgeUtilities,
} from "./types/AppBridge";
import type { PostExternalAssetParams, OauthTokens, Asset } from "./types";

export interface AppBridgeIframe extends AppBridge {
    appState: AppBridgeAppState;
    assets: AppBridgeAssets;
    auth: AppBridgeAuth;
    context: AppBridgeContext;
    utilities: AppBridgeUtilities;
}

const PUBSUB_TOKEN = generateRandomString();
const DEFAULT_TIMEOUT = 3 * 1000;
const OAUTH2_TIMEOUT = 5 * 60 * 1000;
const FILE_UPLOAD_TIMEOUT = 10 * 1000;

const appState: AppBridgeAppState = {
    getAppState<T = Record<string, unknown>>(): Promise<T> {
        notify(Topic.GetAppState, PUBSUB_TOKEN);
        return subscribe<T>(Topic.GetAppState, PUBSUB_TOKEN);
    },

    async updateAppState<T = Record<string, unknown>>(newState: T): Promise<boolean> {
        notify(Topic.UpdateAppState, PUBSUB_TOKEN, { newState });
        return subscribe<boolean>(Topic.UpdateAppState, PUBSUB_TOKEN);
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

    openAssetChooser: (): void => {
        notify(Topic.OpenAssetChooser, PUBSUB_TOKEN);
    },

    async postExternalAsset(asset: PostExternalAssetParams): Promise<Asset> {
        const timeout = asset.previewUrl ? FILE_UPLOAD_TIMEOUT : DEFAULT_TIMEOUT;
        notify(Topic.PostExternalAsset, PUBSUB_TOKEN, { asset });
        return subscribe<Asset>(Topic.PostExternalAsset, PUBSUB_TOKEN, {
            timeout,
        });
    },
};

const auth: AppBridgeAuth = {
    getThirdPartyOauth2Tokens(): Promise<OauthTokens> {
        notify(Topic.GetThirdPartyOauth2Token, PUBSUB_TOKEN);
        return subscribe<OauthTokens>(Topic.GetThirdPartyOauth2Token, PUBSUB_TOKEN, {
            timeout: OAUTH2_TIMEOUT,
        });
    },

    getRefreshedThirdpartyOauth2Tokens(refreshToken: string): Promise<OauthTokens> {
        notify(Topic.GetRefreshedThirdpartyOauth2Token, PUBSUB_TOKEN, refreshToken);
        return subscribe<OauthTokens>(Topic.GetRefreshedThirdpartyOauth2Token, PUBSUB_TOKEN);
    },
};

const context: AppBridgeContext = {
    getProjectId: (): Promise<number> => {
        notify(Topic.GetProjectId, PUBSUB_TOKEN);
        return subscribe<number>(Topic.GetProjectId, PUBSUB_TOKEN);
    },
};

const utilities: AppBridgeUtilities = {
    closeApp(): void {
        notify(Topic.CloseApp, PUBSUB_TOKEN);
    },
};

export default <AppBridgeIframe>{
    appState,
    assets,
    auth,
    context,
    utilities,
};
