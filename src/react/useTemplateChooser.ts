/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeNative } from '../AppBridgeNative';
import { TemplateChooserTemplateChosenCallback } from '../types/Terrific';

type UseTemplateChooserType = {
    openTemplateChooser: (callback: TemplateChooserTemplateChosenCallback) => void;
    closeTemplateChooser: () => void;
};

export const useTemplateChooser = (): UseTemplateChooserType => {
    const { openTemplateChooser, closeTemplateChooser } = new AppBridgeNative();
    return { openTemplateChooser, closeTemplateChooser };
};
