/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetChooserAssetChosenCallback, AssetChooserOptions } from '../types/Terrific';
import { AppBridgeNative } from '../AppBridgeNative';
import { IAppBridgeNative } from '../IAppBridgeNative';

type UseAssetChooserType = {
    openAssetChooser: (callback: AssetChooserAssetChosenCallback, options: AssetChooserOptions) => void;
    closeAssetChooser: () => void;
};

export const useAssetChooser = (appBridge?: IAppBridgeNative): UseAssetChooserType => {
    const { openAssetChooser, closeAssetChooser } = appBridge ?? new AppBridgeNative(0, 0);
    return { openAssetChooser, closeAssetChooser };
};
