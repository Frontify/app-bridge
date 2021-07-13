const token = "AjY34F87Dsat^J";
const mockGenerateRandomString = jest.fn().mockImplementation(() => token);

import appBridgeIframe from "./AppBridgeIframe";
import { Topic } from "./types";
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
const expectedResult = { test: "passed" };

const DEFAULT_TIMEOUT = 3 * 1000;
const LONG_TIMEOUT = 5 * 60 * 1000;

beforeEach(() => {
    mockNotify.mockClear();
    mockSubscribe.mockClear();
    mockSubscribe.mockImplementationOnce((): Promise<Record<string, unknown>> => Promise.resolve(expectedResult));

    expect(mockGenerate).toHaveBeenCalledTimes(1);
    expect(mockGenerate).toHaveReturnedWith(token);
});

describe("AppState", () => {
    test("getAppState", () => {
        const result = appBridgeIframe.appState.getAppState();

        expect(mockNotify).toHaveBeenCalledTimes(1);
        expect(mockNotify).toHaveBeenCalledWith(Topic.GetAppState, token);

        expect(mockSubscribe).toHaveBeenCalledTimes(1);
        expect(mockSubscribe).toHaveBeenCalledWith(Topic.GetAppState, token);
        expect(result).resolves.toEqual(expectedResult);
    });

    test("putAppState", () => {
        const newState = { new: "state" };
        const result = appBridgeIframe.appState.putAppState(newState);

        expect(mockNotify).toHaveBeenCalledTimes(1);
        expect(mockNotify).toHaveBeenCalledWith(Topic.PutAppState, token, newState);

        expect(mockSubscribe).toHaveBeenCalledTimes(1);
        expect(mockSubscribe).toHaveBeenCalledWith(Topic.PutAppState, token);
        expect(result).resolves.toEqual(expectedResult);
    });

    test("deleteAppState", () => {
        const result = appBridgeIframe.appState.deleteAppState();

        expect(mockNotify).toHaveBeenCalledTimes(1);
        expect(mockNotify).toHaveBeenCalledWith(Topic.DeleteAppState, token);

        expect(mockSubscribe).toHaveBeenCalledTimes(1);
        expect(mockSubscribe).toHaveBeenCalledWith(Topic.DeleteAppState, token);
        expect(result).resolves.toEqual(expectedResult);
    });
});

describe("AppBridgeAssets", () => {
    test("getAssetByd", () => {
        const assetId = 4076;
        const result = appBridgeIframe.assets.getAssetById(assetId);

        expect(mockNotify).toHaveBeenCalledTimes(1);
        expect(mockNotify).toHaveBeenCalledWith(Topic.GetAssetById, token, { assetId });

        expect(mockSubscribe).toHaveBeenCalledTimes(1);
        expect(mockSubscribe).toHaveBeenCalledWith(Topic.GetAssetById, token);
        expect(result).resolves.toEqual(expectedResult);
    });

    test("postExternalAssetWithPreview", () => {
        const assets = [
            {
                title: "My external asset",
                url: "https://www.post-external-asset.test",
                previewUrl: "https://www.preview-url.test",
            },
            {
                title: "My external asset",
                url: "https://www.post-external-asset.test",
                previewUrl: "https://www.preview-url.test",
            },
        ];
        const result = appBridgeIframe.assets.postExternalAssets(assets);

        expect(mockNotify).toHaveBeenCalledTimes(1);
        expect(mockNotify).toHaveBeenCalledWith(Topic.PostExternalAssets, token, assets);

        expect(mockSubscribe).toHaveBeenCalledTimes(1);
        expect(mockSubscribe).toHaveBeenCalledWith(Topic.PostExternalAssets, token, { timeout: LONG_TIMEOUT });
        expect(result).resolves.toEqual(expectedResult);
    });

    test("postExternalAssetWithoutPreview", () => {
        const assets = [
            {
                title: "My external asset",
                url: "https://www.post-external-asset.test",
            },
            {
                title: "My external asset",
                url: "https://www.post-external-asset.test",
            },
        ];
        const result = appBridgeIframe.assets.postExternalAssets(assets);

        expect(mockNotify).toHaveBeenCalledTimes(1);
        expect(mockNotify).toHaveBeenCalledWith(Topic.PostExternalAssets, token, assets);

        expect(mockSubscribe).toHaveBeenCalledTimes(1);
        expect(mockSubscribe).toHaveBeenCalledWith(Topic.PostExternalAssets, token, { timeout: DEFAULT_TIMEOUT });
        expect(result).resolves.toEqual(expectedResult);
    });
});
describe("AppBridgeAuth", () => {
    test("getThirdPartyOauth2Tokens", async () => {
        const result = appBridgeIframe.auth.getThirdPartyOauth2Tokens();

        expect(mockNotify).toHaveBeenCalledTimes(1);
        expect(mockNotify).toHaveBeenCalledWith(Topic.GetThirdPartyOauth2Tokens, token);

        expect(mockSubscribe).toHaveBeenCalledTimes(1);
        expect(mockSubscribe).toHaveBeenCalledWith(Topic.GetThirdPartyOauth2Tokens, token, {
            timeout: LONG_TIMEOUT,
        });
        expect(result).resolves.toEqual(expectedResult);
    });

    test("getRefreshedThirdpartyOauth2Tokens", () => {
        const refreshToken = "8raSsn0nG5v4";
        const result = appBridgeIframe.auth.getRefreshedThirdpartyOauth2Tokens(refreshToken);
        expect(mockNotify).toHaveBeenCalledTimes(1);
        expect(mockNotify).toHaveBeenCalledWith(Topic.GetRefreshedThirdpartyOauth2Token, token, { refreshToken });

        expect(mockSubscribe).toHaveBeenCalledTimes(1);
        expect(mockSubscribe).toHaveBeenCalledWith(Topic.GetRefreshedThirdpartyOauth2Token, token);
        expect(result).resolves.toEqual(expectedResult);
    });
});

describe("Utilities", () => {
    test("closeApp", () => {
        appBridgeIframe.utilities.closeApp();

        expect(mockNotify).toHaveBeenCalledTimes(1);
        expect(mockNotify).toHaveBeenCalledWith(Topic.CloseApp, token);
    });

    test("openAssetChooser", () => {
        appBridgeIframe.utilities.openAssetChooser(() => null);

        expect(mockNotify).toHaveBeenCalledTimes(1);
        expect(mockNotify).toHaveBeenCalledWith(Topic.OpenAssetChooser, token);
    });
});
