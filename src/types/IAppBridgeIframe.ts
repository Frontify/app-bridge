/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset } from './Asset';
import { OauthTokens } from './OauthTokens';
import { PostExternalAssetParams } from './PostExternalAssetParams';
import { NotifyData } from '../utilities/notify';

export interface IAppBridgeIframe {
    appState: {
        getAppState: <T = Record<string, unknown>>() => Promise<T>;
        putAppState: (newState: NotifyData) => Promise<boolean>;
        deleteAppState: () => Promise<boolean>;
    };
    assets: {
        getAssetById: (assetId: number) => Promise<Asset>;
        postExternalAssets: (asset: PostExternalAssetParams[]) => Promise<Asset[]>;
    };
    auth: {
        getThirdPartyOauth2Tokens: () => Promise<OauthTokens>;
        getRefreshedThirdpartyOauth2Tokens: (refreshToken: string) => Promise<OauthTokens>;
    };
    utilities: {
        closeApp: () => void;
        openAssetChooser: (callback: (data: unknown) => void) => void;
    };
}
