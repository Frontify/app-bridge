/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GuidelineFolder, GuidelineFolderCreate, GuidelineFolderPatch } from '../types';
import { HttpClient } from '../utilities/httpClient';

export type GuidelineFolderApi = CamelKeysToSnakeCase<GuidelineFolder>;

export const mapToGuidelineFolder = (object: GuidelineFolderApi): GuidelineFolder => ({
    id: object.id,
    guidelineNavigationId: object.guideline_navigation_id,
    title: object.title,
    dropdown: object.dropdown,
});

export const mapToGuidelineFolderApi = (object: Partial<GuidelineFolder>): Partial<GuidelineFolderApi> => ({
    id: object.id,
    guideline_navigation_id: object.guidelineNavigationId,
    title: object.title,
    dropdown: object.dropdown,
});

export const createNavigationFolder = async (folder: GuidelineFolderCreate): Promise<GuidelineFolder> => {
    const { result } = await HttpClient.post<GuidelineFolderApi>(
        '/api/guideline-folder',
        mapToGuidelineFolderApi(folder),
    );

    return mapToGuidelineFolder(result.data);
};

export const updateNavigationFolder = async (itemId: number, item: GuidelineFolderPatch): Promise<GuidelineFolder> => {
    const { result } = await HttpClient.patch<GuidelineFolderApi>(
        `/api/guideline-folder/${itemId}`,
        mapToGuidelineFolderApi(item),
    );

    return mapToGuidelineFolder(result.data);
};
