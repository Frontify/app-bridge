/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GuidelineFolder, GuidelineFolderCreate, GuidelineFolderPatch } from '../types';
import { HttpClient } from '../utilities/httpClient';

export type GuidelineFolderApi = {
    id: number;
    styleguide_navigation_id: number;
    title: string;
    dropdown: boolean;
};

export const mapToGuidelineFolderType = (object: GuidelineFolderApi): GuidelineFolder => ({
    id: object.id,
    guidelineNavigationId: object.styleguide_navigation_id,
    title: object.title,
    dropdown: object.dropdown,
});

export const mapToGuidelineFolderApi = (object: Partial<GuidelineFolder>): Partial<GuidelineFolderApi> => ({
    id: object.id,
    styleguide_navigation_id: object.guidelineNavigationId,
    title: object.title,
    dropdown: object.dropdown,
});

export const createNavigationFolder = async (folder: GuidelineFolderCreate): Promise<GuidelineFolder> => {
    const { result } = await HttpClient.post<GuidelineFolderApi>(
        '/api/styleguide-folder',
        mapToGuidelineFolderApi(folder),
    );

    return mapToGuidelineFolderType(result.data);
};

export const updateNavigationFolder = async (itemId: number, item: GuidelineFolderPatch): Promise<GuidelineFolder> => {
    const { result } = await HttpClient.patch<GuidelineFolderApi>(
        `/api/styleguide-folder/${itemId}`,
        mapToGuidelineFolderApi(item),
    );

    return mapToGuidelineFolderType(result.data);
};
