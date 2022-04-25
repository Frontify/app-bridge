/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';
import { IAppBridgeNative } from '../IAppBridgeNative';
import { Asset } from '../types/Asset';
import { compareObjects } from '../utilities/object';

const mapDocumentBlockAssetsToBlockAssets = (documentBlockAssets: any): Record<string, Asset[]> => {
    return documentBlockAssets.reduce((stack: Record<string, Asset[]>, documentBlockAsset: any) => {
        if (!stack[documentBlockAsset.setting_id]) {
            stack[documentBlockAsset.setting_id] = [];
        }

        stack[documentBlockAsset.setting_id].push({
            id: documentBlockAsset.asset.id,
            name: documentBlockAsset.asset.name,
            width: documentBlockAsset.asset.width,
            height: documentBlockAsset.asset.height,
            creator_name: '', // TODO: implement enriching of the data (https://app.clickup.com/t/29ad2bj)
            ext: documentBlockAsset.asset.ext,
            generic_url: documentBlockAsset.asset.generic_url,
            preview_url: documentBlockAsset.asset.preview_url,
            object_type: documentBlockAsset.asset.object_type,
            project_id: documentBlockAsset.asset.project_id,
            project_name: '', // TODO: implement enriching of the data (https://app.clickup.com/t/29ad2bj)
            filename: documentBlockAsset.asset.file_name,
            size: documentBlockAsset.asset.file_size,
            title: documentBlockAsset.asset.title,
            status: documentBlockAsset.asset.status,
        });

        return stack;
    }, {});
};

const fetchAllBlockAssetsByBlockId = async (blockId: number) => {
    const response = await fetch(`/api/document-block/${blockId}/asset`, {
        method: 'GET',
        headers: {
            'x-csrf-token': (document.getElementsByName('x-csrf-token')[0] as HTMLMetaElement).content,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Couldn't fetch block assets: ${response.statusText}`);
    }

    const responseJson = await response.json();

    return mapDocumentBlockAssetsToBlockAssets(responseJson.data);
};

export const useBlockAssets = (appBridge: IAppBridgeNative) => {
    const blockId = appBridge.blockId;

    if (blockId === undefined) {
        throw new Error('You need to instanciate the App Bridge with a block id.');
    }

    const [blockAssets, setBlockAssets] = useState<Record<string, Asset[]>>({});

    // Fetch the block assets on mount.
    // And add listener for block assets updates.
    useEffect(() => {
        const blockId = appBridge.getBlockId();
        const updateBlockAssetsFromEvent = (event: { blockId: number; blockAssets: Record<string, Asset[]> }) => {
            if (event.blockId === blockId && !compareObjects(event.blockAssets, blockAssets)) {
                setBlockAssets(event.blockAssets);
            }
        };

        if (blockId) {
            const mountingFetch = async () => {
                const allBlockAssets = await fetchAllBlockAssetsByBlockId(blockId);
                setBlockAssets(allBlockAssets);
            };
            mountingFetch();

            window.emitter.on('StyleguideBlockAssetsUpdated', updateBlockAssetsFromEvent);
        }

        return () => {
            window.emitter.off('StyleguideBlockAssetsUpdated', updateBlockAssetsFromEvent);
        };
    }, [appBridge]);

    const deleteAssetIdsFromKey = async (key: string, assetIds: number[]) => {
        if (blockId === undefined) {
            throw new Error('You need to instanciate the App Bridge with a block id.');
        }

        const response = await fetch(`/api/document-block/${blockId}/asset/${key}`, {
            method: 'DELETE',
            headers: {
                'x-csrf-token': (document.getElementsByName('x-csrf-token')[0] as HTMLMetaElement).content,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ asset_ids: assetIds }),
        });

        if (!response.ok) {
            throw new Error(`Couldn't delete assets: ${response.statusText}`);
        }
    };

    const addAssetIdsToKey = async (key: string, assetIds: number[]) => {
        if (blockId === undefined) {
            throw new Error('You need to instanciate the App Bridge with a block id.');
        }

        const response = await fetch(`/api/document-block/${blockId}/asset/${key}`, {
            method: 'POST',
            headers: {
                'x-csrf-token': (document.getElementsByName('x-csrf-token')[0] as HTMLMetaElement).content,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ asset_ids: assetIds }),
        });

        if (!response.ok) {
            throw new Error(`Couldn't add assets: ${response.statusText}`);
        }

        const responseJson = await response.json();

        await waitForFinishedProcessing(key);

        const newAssets = mapDocumentBlockAssetsToBlockAssets(responseJson.data)[key];
        return newAssets;
    };

    const waitForFinishedProcessing = async (key: string): Promise<void> => {
        return new Promise((resolve) => {
            const intervalId = window.setInterval(async () => {
                const currentBlockAssets = await fetchAllBlockAssetsByBlockId(blockId);

                if (currentBlockAssets[key] && currentBlockAssets[key].every((asset) => asset.status === 'FINISHED')) {
                    clearInterval(intervalId);
                    resolve();
                }
            }, 1000);
        });
    };

    const updateAssetIdsFromKey = async (key: string, newAssetIds: number[]) => {
        if (blockId === undefined) {
            throw new Error('You need to instanciate the App Bridge with a block id.');
        }
        const currentBlockAssets = await fetchAllBlockAssetsByBlockId(blockId);

        const oldAssetIds = currentBlockAssets[key]?.map((asset) => asset.id) ?? [];
        const assetIdsToDelete = oldAssetIds.filter((oldAssetId) => !newAssetIds.includes(oldAssetId));
        const assetIdsToAdd = newAssetIds.filter((newAssetId) => !oldAssetIds.includes(newAssetId));

        if (assetIdsToDelete.length > 0) {
            await deleteAssetIdsFromKey(key, assetIdsToDelete);
        }

        if (assetIdsToAdd.length > 0) {
            await addAssetIdsToKey(key, assetIdsToAdd);
        }

        window.emitter.emit('StyleguideBlockAssetsUpdated', {
            blockId,
            blockAssets: await fetchAllBlockAssetsByBlockId(blockId),
        });
    };

    return {
        blockAssets,
        updateAssetIdsFromKey,
        addAssetIdsToKey,
        deleteAssetIdsFromKey,
    };
};
