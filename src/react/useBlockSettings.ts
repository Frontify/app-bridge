import { useState } from 'react';
import { IAppBridgeNative } from '../types/IAppBridgeNative';

export const useBlockSettings = <T = Record<string, unknown>>(
    appBridge: IAppBridgeNative,
): [T, (newSettings: Partial<T>) => Promise<void>] => {
    const blockId = appBridge.getBlockId();

    if (blockId === undefined) {
        throw new Error('You need to instanciate the App Bridge with a block id.');
    }

    if (!window.blockSettings[blockId].__isProxy) {
        window.blockSettings[blockId] = new Proxy(window.blockSettings[blockId], {
            get: (target: Record<string, unknown>, property: string, received: unknown) => {
                if (property === '__isProxy') {
                    return true;
                }
                return Reflect.get(target, property, received);
            },
            set: (target: Record<string, unknown>, property: string, value: unknown) => {
                setBlockSettings({ ...(target as T), [property]: value });
                target[property] = value;
                return true;
            },
        });
    }

    const [blockSettings, setBlockSettings] = useState<T>(window.blockSettings[blockId] as T);

    const setBlockSettingsAndUpdate = async (newSettings: Partial<T>): Promise<void> => {
        for (const settingsIndex in newSettings) {
            window.blockSettings[blockId][settingsIndex] = newSettings[settingsIndex];
        }
        await appBridge.updateBlockSettings({ ...newSettings });
    };

    return [blockSettings, setBlockSettingsAndUpdate];
};
