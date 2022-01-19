/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetChooserAssetChosenCallback, AssetChooserOptions } from "../types/Terrific";
import { AppBridgeNative } from "../AppBridgeNative";

type UseAssetChooserType = {
    openAssetChooser: (callback: AssetChooserAssetChosenCallback, options: AssetChooserOptions) => void;
    closeAssetChooser: () => void;
};

export const useAssetChooser = (): UseAssetChooserType => {
    const appBridge = new AppBridgeNative();
    return { openAssetChooser: appBridge.openAssetChooser, closeAssetChooser: appBridge.closeAssetChooser };
};
