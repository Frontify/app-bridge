/* (c) Copyright Frontify Ltd., all rights reserved. */

const token = 'AjY34F87Dsat^J';

import { AppBridgeIframe } from './AppBridgeIframe';
import { Topic } from './types';
import { notify } from './utilities/notify';
import { subscribe } from './utilities/subscribe';
import { generateRandomString } from './utilities/hash';
import { afterEach, beforeAll, describe, expect, test, vi } from 'vitest';

vi.mock('./utilities/subscribe', () => {
    return {
        subscribe: vi.fn(() => Promise.resolve(expectedResult)),
    };
});
vi.mock('./utilities/hash', () => {
    return {
        generateRandomString: vi.fn(() => token),
    };
});

vi.mock('./utilities/notify', () => {
    return {
        notify: vi.fn(),
    };
});

const expectedResult = { test: 'passed' };

const DEFAULT_TIMEOUT = 3 * 1000;
const LONG_TIMEOUT = 5 * 60 * 1000;

beforeAll(() => {
    expect(generateRandomString).toHaveBeenCalledTimes(1);
    expect(generateRandomString).toHaveReturnedWith(token);
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('AppState', () => {
    test('getAppState', () => {
        const result = AppBridgeIframe.appState.getAppState();

        expect(notify).toHaveBeenCalledTimes(1);
        expect(notify).toHaveBeenCalledWith(Topic.GetAppState, token);

        expect(subscribe).toHaveBeenCalledTimes(1);
        expect(subscribe).toHaveBeenCalledWith(Topic.GetAppState, token);
        expect(result).resolves.toEqual(expectedResult);
    });

    test('putAppState', () => {
        const newState = { new: 'state' };
        const result = AppBridgeIframe.appState.putAppState(newState);

        expect(notify).toHaveBeenCalledTimes(1);
        expect(notify).toHaveBeenCalledWith(Topic.PutAppState, token, newState);

        expect(subscribe).toHaveBeenCalledTimes(1);
        expect(subscribe).toHaveBeenCalledWith(Topic.PutAppState, token);
        expect(result).resolves.toEqual(expectedResult);
    });

    test('deleteAppState', () => {
        const result = AppBridgeIframe.appState.deleteAppState();

        expect(notify).toHaveBeenCalledTimes(1);
        expect(notify).toHaveBeenCalledWith(Topic.DeleteAppState, token);

        expect(subscribe).toHaveBeenCalledTimes(1);
        expect(subscribe).toHaveBeenCalledWith(Topic.DeleteAppState, token);
        expect(result).resolves.toEqual(expectedResult);
    });
});

describe('AppBridgeAssets', () => {
    test('getAssetByd', () => {
        const assetId = 4076;
        const result = AppBridgeIframe.assets.getAssetById(assetId);

        expect(notify).toHaveBeenCalledTimes(1);
        expect(notify).toHaveBeenCalledWith(Topic.GetAssetById, token, { assetId });

        expect(subscribe).toHaveBeenCalledTimes(1);
        expect(subscribe).toHaveBeenCalledWith(Topic.GetAssetById, token);
        expect(result).resolves.toEqual(expectedResult);
    });

    test('postExternalAssetWithPreview', () => {
        const assets = [
            {
                title: 'My external asset',
                url: 'https://www.post-external-asset.test',
                previewUrl: 'https://www.preview-url.test',
            },
            {
                title: 'My external asset',
                url: 'https://www.post-external-asset.test',
                previewUrl: 'https://www.preview-url.test',
            },
        ];
        const result = AppBridgeIframe.assets.postExternalAssets(assets);

        expect(notify).toHaveBeenCalledTimes(1);
        expect(notify).toHaveBeenCalledWith(Topic.PostExternalAssets, token, assets);

        expect(subscribe).toHaveBeenCalledTimes(1);
        expect(subscribe).toHaveBeenCalledWith(Topic.PostExternalAssets, token, { timeout: LONG_TIMEOUT });
        expect(result).resolves.toEqual(expectedResult);
    });

    test('postExternalAssetWithoutPreview', () => {
        const assets = [
            {
                title: 'My external asset',
                url: 'https://www.post-external-asset.test',
            },
            {
                title: 'My external asset',
                url: 'https://www.post-external-asset.test',
            },
        ];
        const result = AppBridgeIframe.assets.postExternalAssets(assets);

        expect(notify).toHaveBeenCalledTimes(1);
        expect(notify).toHaveBeenCalledWith(Topic.PostExternalAssets, token, assets);

        expect(subscribe).toHaveBeenCalledTimes(1);
        expect(subscribe).toHaveBeenCalledWith(Topic.PostExternalAssets, token, { timeout: DEFAULT_TIMEOUT });
        expect(result).resolves.toEqual(expectedResult);
    });
});
describe('AppBridgeAuth', () => {
    test('getThirdPartyOauth2Tokens', async () => {
        const result = AppBridgeIframe.auth.getThirdPartyOauth2Tokens();

        expect(notify).toHaveBeenCalledTimes(1);
        expect(notify).toHaveBeenCalledWith(Topic.GetThirdPartyOauth2Tokens, token);

        expect(subscribe).toHaveBeenCalledTimes(1);
        expect(subscribe).toHaveBeenCalledWith(Topic.GetThirdPartyOauth2Tokens, token, {
            timeout: LONG_TIMEOUT,
        });
        expect(result).resolves.toEqual(expectedResult);
    });

    test('getRefreshedThirdpartyOauth2Tokens', () => {
        const refreshToken = '8raSsn0nG5v4';
        const result = AppBridgeIframe.auth.getRefreshedThirdpartyOauth2Tokens(refreshToken);
        expect(notify).toHaveBeenCalledTimes(1);
        expect(notify).toHaveBeenCalledWith(Topic.GetRefreshedThirdpartyOauth2Token, token, { refreshToken });

        expect(subscribe).toHaveBeenCalledTimes(1);
        expect(subscribe).toHaveBeenCalledWith(Topic.GetRefreshedThirdpartyOauth2Token, token);
        expect(result).resolves.toEqual(expectedResult);
    });
});

describe('Utilities', () => {
    test('closeApp', () => {
        AppBridgeIframe.utilities.closeApp();

        expect(notify).toHaveBeenCalledTimes(1);
        expect(notify).toHaveBeenCalledWith(Topic.CloseApp, token);
    });

    test('openAssetChooser', () => {
        AppBridgeIframe.utilities.openAssetChooser(() => null);

        expect(notify).toHaveBeenCalledTimes(1);
        expect(notify).toHaveBeenCalledWith(Topic.OpenAssetChooser, token);
    });
});
