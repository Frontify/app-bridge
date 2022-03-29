/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';
import { IAppBridgeNative } from '../IAppBridgeNative';
import { Asset } from '../types/Asset';

const mapDocumentBlockAssetsToBlockAssets = (documentBlockAssets: any) => {
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
        });

        return stack;
    }, {});
};

const fetchAllBlockAssets = async (blockId: number) => {
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
    const [blockAssets, setBlockAssets] = useState<Record<string, Asset[]>>({});

    useEffect(() => {
        (async () => {
            const blockId = appBridge.getBlockId();
            if (blockId) {
                const blockAssets = await fetchAllBlockAssets(blockId);
                setBlockAssets(blockAssets);
            }
        })();
    }, [appBridge]);

    const updateBlockAssets = async (newBlockAssets: Record<string, Asset[]>) => {
        for (const settingId in newBlockAssets) {
            const newAssetIds = newBlockAssets[settingId].map((asset) => asset.id);
            const oldAssetIds = blockAssets[settingId].map((asset) => asset.id);
            const assetsToDelete = oldAssetIds.filter((oldAssetId) => !newAssetIds.includes(oldAssetId));
            const assetsToAdd = newAssetIds.filter((newAssetId) => !oldAssetIds.includes(newAssetId));

            let assets = blockAssets[settingId];
            if (assetsToDelete.length > 0) {
                await deleteAssetsFromSetting(appBridge, settingId, assetsToDelete);
                assets = assets.filter((asset) => !assetsToDelete.includes(asset.id));
            }

            if (assetsToAdd.length > 0) {
                const documentBlockAssets = await addAssetsToSetting(appBridge, settingId, assetsToAdd);
                assets.push(...documentBlockAssets[settingId]);
            }

            setBlockAssets({ [settingId]: assets });
        }
    };

    return [blockAssets, updateBlockAssets];
};

const deleteAssetsFromSetting = async (appBridge: IAppBridgeNative, settingId: string, assetIds: number[]) => {
    const blockId = appBridge.getBlockId();

    const response = await fetch(`/api/document-block/${blockId}/asset/${settingId}`, {
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

const addAssetsToSetting = async (appBridge: IAppBridgeNative, settingId: string, assetIds: number[]) => {
    const blockId = appBridge.getBlockId();

    const response = await fetch(`/api/document-block/${blockId}/asset/${settingId}`, {
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

    return mapDocumentBlockAssetsToBlockAssets(responseJson.data);
};
