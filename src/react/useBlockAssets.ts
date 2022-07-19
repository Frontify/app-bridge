/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';
import { IAppBridgeNative } from '../types/IAppBridgeNative';
import { Asset } from '../types/Asset';
import { compareObjects } from '../utilities/object';

export const useBlockAssets = (appBridge: IAppBridgeNative) => {
    const blockId = appBridge.getBlockId();

    if (blockId === undefined) {
        throw new Error('You need to instanciate the App Bridge with a block id.');
    }

    const [blockAssets, setBlockAssets] = useState<Record<string, Asset[]>>({});

    // Fetch the block assets on mount.
    // And add listener for block assets updates.
    useEffect(() => {
        const updateBlockAssetsFromEvent = (event: { blockId: number; blockAssets: Record<string, Asset[]> }) => {
            if (event.blockId === blockId && !compareObjects(event.blockAssets, blockAssets)) {
                setBlockAssets(event.blockAssets);
            }
        };

        if (blockId) {
            const mountingFetch = async () => {
                const allBlockAssets = await appBridge.getBlockAssets();
                setBlockAssets(allBlockAssets);
            };
            mountingFetch();

            window.emitter.on('AppBridge:BlockAssetsUpdated', updateBlockAssetsFromEvent);
        }

        return () => {
            window.emitter.off('AppBridge:BlockAssetsUpdated', updateBlockAssetsFromEvent);
        };
    }, [appBridge]);

    const updateAssetIdsFromKey = async (key: string, newAssetIds: number[]) => {
        const currentBlockAssets = await appBridge.getBlockAssets();

        const oldAssetIds = currentBlockAssets[key]?.map((asset) => asset.id) ?? [];
        const assetIdsToDelete = oldAssetIds.filter((oldAssetId) => !newAssetIds.includes(oldAssetId));
        const assetIdsToAdd = newAssetIds.filter((newAssetId) => !oldAssetIds.includes(newAssetId));

        if (assetIdsToDelete.length > 0) {
            await appBridge.deleteAssetIdsFromBlockAssetKey(key, assetIdsToDelete);
        }

        if (assetIdsToAdd.length > 0) {
            await appBridge.addAssetIdsToBlockAssetKey(key, assetIdsToAdd);
        }

        window.emitter.emit('AppBridge:BlockAssetsUpdated', {
            blockId,
            blockAssets: await appBridge.getBlockAssets(),
        });
    };

    return {
        blockAssets,
        updateAssetIdsFromKey,
        addAssetIdsToKey: appBridge.addAssetIdsToBlockAssetKey,
        deleteAssetIdsFromKey: appBridge.deleteAssetIdsFromBlockAssetKey,
    };
};
