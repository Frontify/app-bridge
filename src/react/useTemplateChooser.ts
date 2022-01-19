/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeNative } from "../AppBridgeNative";
import { TemplateChooserTemplateChosenCallback } from "../types/Terrific";

type UseTemplateChooserType = {
    openTemplateChooser: (callback: TemplateChooserTemplateChosenCallback) => void;
    closeTemplateChooser: () => void;
};

export const useTemplateChooser = (): UseTemplateChooserType => {
    const appBridge = new AppBridgeNative();
    return { openTemplateChooser: appBridge.openTemplateChooser, closeTemplateChooser: appBridge.closeTemplateChooser };
};
