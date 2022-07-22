/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';
import { IAppBridgeNative } from '../types/IAppBridgeNative';
import { compareObjects, mergeDeep } from '../utilities/object';

export type BlockSettingsUpdateEvent<T> = {
    blockId: number;
    blockSettings: T;
};

export const useBlockSettings = <T = Record<string, unknown>>(
    appBridge: IAppBridgeNative,
): [T, (newSettings: Partial<T>) => Promise<void>] => {
    const blockId = appBridge.getBlockId();

    const [blockSettings, setBlockSettings] = useState<T>({} as T);

    // Fetch the block settings on mount.
    // And add listener for block settings updates.
    useEffect(() => {
        const updateBlockSettingsFromEvent = (event: BlockSettingsUpdateEvent<T>) => {
            if (event.blockId === blockId && !compareObjects(event.blockSettings, blockSettings)) {
                setBlockSettings(mergeDeep<T>(blockSettings, event.blockSettings));
            }
        };

        const mountingFetch = async () => {
            const allBlockSettings = await appBridge.getBlockSettings<T>();
            setBlockSettings(allBlockSettings);
        };
        mountingFetch();

        window.emitter.on('AppBridge:BlockSettingsUpdated', updateBlockSettingsFromEvent);

        return () => {
            window.emitter.off('AppBridge:BlockSettingsUpdated', updateBlockSettingsFromEvent);
        };
    }, [appBridge]);

    const updateBlockSettings = async (blockSettings: Partial<T>) => {
        try {
            await appBridge.updateBlockSettings(blockSettings);
            window.emitter.emit('AppBridge:BlockSettingsUpdated', {
                blockId,
                blockSettings,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return [blockSettings, updateBlockSettings];
};
