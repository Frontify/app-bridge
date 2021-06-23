const token = "AjY34F87Dsat^J";
const mockGenerateRandomString = jest.fn().mockImplementation(() => token);

import appBridgeIframe from "./AppBridgeIframe";
import { Topic } from "./types/AppBridge";
import notify from "./utilities/notify";
import subscribe from "./utilities/subscribe";
import { generateRandomString } from "./utilities/hash";

jest.mock("./utilities/notify");
jest.mock("./utilities/subscribe");
jest.mock("./utilities/hash", () => ({
    generateRandomString: mockGenerateRandomString,
}));

const mockNotify = notify as jest.MockedFunction<typeof notify>;
const mockSubscribe = subscribe as jest.MockedFunction<typeof subscribe>;
const mockGenerate = generateRandomString as jest.MockedFunction<typeof generateRandomString>;

const DEFAULT_TIMEOUT = 3 * 1000;
const OAUTH2_TIMEOUT = 5 * 60 * 1000;
const FILE_UPLOAD_TIMEOUT = 10 * 1000;

beforeEach(() => {
    mockNotify.mockClear();
    mockSubscribe.mockClear();

    expect(mockGenerate).toHaveBeenCalledTimes(1);
    expect(mockGenerate).toHaveReturnedWith(token);
});

describe("AppState", () => {
    test("getAppState", () => {
        appBridgeIframe.appState.getAppState();

        expect(mockNotify).toHaveBeenCalledTimes(1);
        expect(mockNotify).toHaveBeenCalledWith(Topic.GetAppState, token);

        expect(mockSubscribe).toHaveBeenCalledTimes(1);
        expect(mockSubscribe).toHaveBeenCalledWith(Topic.GetAppState, token);
    });

    test("updateAppState", () => {
        const newState = { new: "state" };
        appBridgeIframe.appState.updateAppState(newState);

        expect(mockNotify).toHaveBeenCalledTimes(1);
        expect(mockNotify).toHaveBeenCalledWith(Topic.UpdateAppState, token, { newState });

        expect(mockSubscribe).toHaveBeenCalledTimes(1);
        expect(mockSubscribe).toHaveBeenCalledWith(Topic.UpdateAppState, token);
    });

    test("deleteAppState", () => {
        appBridgeIframe.appState.deleteAppState();

        expect(mockNotify).toHaveBeenCalledTimes(1);
        expect(mockNotify).toHaveBeenCalledWith(Topic.DeleteAppState, token);

        expect(mockSubscribe).toHaveBeenCalledTimes(1);
        expect(mockSubscribe).toHaveBeenCalledWith(Topic.DeleteAppState, token);
    });
});

describe("AppBridgeAssets", () => {
    test("getAssetByd", () => {
        const assetId = 4076;
        appBridgeIframe.assets.getAssetById(assetId);

        expect(mockNotify).toHaveBeenCalledTimes(1);
        expect(mockNotify).toHaveBeenCalledWith(Topic.GetAssetById, token, { assetId });

        expect(mockSubscribe).toHaveBeenCalledTimes(1);
        expect(mockSubscribe).toHaveBeenCalledWith(Topic.GetAssetById, token);
    });

    test("postExternalAssetWithPreview", () => {
        const asset = {
            title: "My external asset",
            url: "https://www.post-external-asset.test",
            previewUrl: "https://www.perview-url.test",
        };
        appBridgeIframe.assets.postExternalAsset(asset);

        expect(mockNotify).toHaveBeenCalledTimes(1);
        expect(mockNotify).toHaveBeenCalledWith(Topic.PostExternalAsset, token, { asset });

        expect(mockSubscribe).toHaveBeenCalledTimes(1);
        expect(mockSubscribe).toHaveBeenCalledWith(Topic.PostExternalAsset, token, { timeout: FILE_UPLOAD_TIMEOUT });
    });

    test("postExternalAssetWithoutPreview", () => {
        const asset = {
            title: "My external asset",
            url: "https://www.post-external-asset.test",
        };
        appBridgeIframe.assets.postExternalAsset(asset);

        expect(mockNotify).toHaveBeenCalledTimes(1);
        expect(mockNotify).toHaveBeenCalledWith(Topic.PostExternalAsset, token, { asset });

        expect(mockSubscribe).toHaveBeenCalledTimes(1);
        expect(mockSubscribe).toHaveBeenCalledWith(Topic.PostExternalAsset, token, { timeout: DEFAULT_TIMEOUT });
    });
});
describe("AppBridgeAuth", () => {
    test("getThirdPartyOauth2Tokens", () => {
        appBridgeIframe.auth.getThirdPartyOauth2Tokens();
        expect(mockNotify).toHaveBeenCalledTimes(1);
        expect(mockNotify).toHaveBeenCalledWith(Topic.GetThirdPartyOauth2Token, token);

        expect(mockSubscribe).toHaveBeenCalledTimes(1);
        expect(mockSubscribe).toHaveBeenCalledWith(Topic.GetThirdPartyOauth2Token, token, {
            timeout: OAUTH2_TIMEOUT,
        });
    });

    test("getRefreshedThirdpartyOauth2Tokens", () => {
        const refreshToken = "8raSsn0nG5v4";
        appBridgeIframe.auth.getRefreshedThirdpartyOauth2Tokens(refreshToken);
        expect(mockNotify).toHaveBeenCalledTimes(1);
        expect(mockNotify).toHaveBeenCalledWith(Topic.GetRefreshedThirdpartyOauth2Token, token, refreshToken);

        expect(mockSubscribe).toHaveBeenCalledTimes(1);
        expect(mockSubscribe).toHaveBeenCalledWith(Topic.GetRefreshedThirdpartyOauth2Token, token);
    });
});

describe("AppBridgeContext", () => {
    test("getProjectId", () => {
        appBridgeIframe.context.getProjectId();

        expect(mockNotify).toHaveBeenCalledTimes(1);
        expect(mockNotify).toHaveBeenCalledWith(Topic.GetProjectId, token);

        expect(mockSubscribe).toHaveBeenCalledTimes(1);
        expect(mockSubscribe).toHaveBeenCalledWith(Topic.GetProjectId, token);
    });
});

describe("Utilities", () => {
    test("closeApp", () => {
        appBridgeIframe.utilities.closeApp();

        expect(mockNotify).toHaveBeenCalledTimes(1);
        expect(mockNotify).toHaveBeenCalledWith(Topic.CloseApp, token);
    });

    test("openAssetChooser", () => {
        appBridgeIframe.utilities.openAssetChooser();

        expect(mockNotify).toHaveBeenCalledTimes(1);
        expect(mockNotify).toHaveBeenCalledWith(Topic.OpenAssetChooser, token);
    });
});
