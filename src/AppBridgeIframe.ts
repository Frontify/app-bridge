import {
    AppBridge,
    AppBridgeAppState,
    AppBridgeAssets,
    AppBridgeAuth,
    AppBridgeContext,
    AppBridgeUtilities,
    Topic,
} from "./types/AppBridge";
import { OauthTokens } from "./types/OauthTokens";
import { generateRandomString } from "./utilities/hash";
import notify from "./utilities/notify";
import subscribe from "./utilities/subscribe";

const OAUTH2_TIMEOUT = 5 * 60 * 1000;
const PUBSUB_TOKEN = generateRandomString();

const appState: AppBridgeAppState = {
    getAppState<T = Record<string, unknown>>(): Promise<T> {
        notify(Topic.GetAppState, PUBSUB_TOKEN);
        return subscribe<T>(Topic.GetAppState, PUBSUB_TOKEN);
    },

    async updateAppState<T = Record<string, unknown>>(newState: T): Promise<boolean> {
        notify(Topic.UpdateAppState, PUBSUB_TOKEN);
        return subscribe<boolean>(Topic.UpdateAppState, PUBSUB_TOKEN, newState);
    },

    async deleteAppState(): Promise<boolean> {
        notify(Topic.GetAppState, PUBSUB_TOKEN);
        return subscribe<boolean>(Topic.DeleteAppState, PUBSUB_TOKEN);
    },
};

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

const auth: AppBridgeAuth = {
    getThirdPartyOauth2Tokens(): Promise<OauthTokens> {
        notify(Topic.GetThirdPartyOauth2Token, PUBSUB_TOKEN);
        return subscribe<OauthTokens>(Topic.GetRefreshedThirdpartyOauth2Token, PUBSUB_TOKEN, {
            timeout: OAUTH2_TIMEOUT,
        });
    },

    getRefreshedThirdpartyOauth2Tokens(refreshToken: string): Promise<OauthTokens> {
        notify(Topic.GetRefreshedThirdpartyOauth2Token, PUBSUB_TOKEN, refreshToken);
        return subscribe<OauthTokens>(Topic.GetRefreshedThirdpartyOauth2Token, PUBSUB_TOKEN);
    },
};

const context: AppBridgeContext = {
    getProjectId: (): number => {
        return 1;
    },
};

const utilities: AppBridgeUtilities = {
    closeApp(): void {
        notify(Topic.CloseApp, PUBSUB_TOKEN);
    },
};

export default <AppBridge>{
    appState,
    assets,
    auth,
    context,
    utilities,
};
