/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset } from '../types/Asset';
import { HttpClient } from '../utilities/httpClient';

export const createAssetByFileId = async (fileId: string, projectId: number, setId?: number): Promise<Asset> => {
    const { result } = await HttpClient.post<Asset>('/api/asset', {
        file_id: fileId,
        project_id: projectId,
        set_id: setId,
    });

    return result.data;
};
