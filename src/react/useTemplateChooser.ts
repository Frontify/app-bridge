/* (c) Copyright Frontify Ltd., all rights reserved. */

import { AppBridgeNative } from '../AppBridgeNative';
import { IAppBridgeNative } from '../types';
import { TemplateChooserTemplateChosenCallback } from '../types/Terrific';

type UseTemplateChooserType = {
    openTemplateChooser: (callback: TemplateChooserTemplateChosenCallback) => void;
    closeTemplateChooser: () => void;
};

export const useTemplateChooser = (appBridge: IAppBridgeNative): UseTemplateChooserType => {
    const { openTemplateChooser, closeTemplateChooser } = appBridge ?? new AppBridgeNative(0, 0);
    return { openTemplateChooser, closeTemplateChooser };
};
