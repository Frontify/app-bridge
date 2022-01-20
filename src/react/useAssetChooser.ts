/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AssetChooserAssetChosenCallback, AssetChooserOptions } from "../types/Terrific";
import { AppBridgeNative } from "../AppBridgeNative";

type UseAssetChooserType = {
    openAssetChooser: (callback: AssetChooserAssetChosenCallback, options: AssetChooserOptions) => void;
    closeAssetChooser: () => void;
};

export const useAssetChooser = (): UseAssetChooserType => {
    const { openAssetChooser, closeAssetChooser } = new AppBridgeNative();
    return { openAssetChooser, closeAssetChooser };
};
