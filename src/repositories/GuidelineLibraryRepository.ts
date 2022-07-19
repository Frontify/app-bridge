/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GuidelineLibrary, GuidelineLibraryCreate, GuidelineLibraryPatch } from '../types';
import { HttpClient } from '../utilities/httpClient';

export type GuidelineLibraryApi = CamelKeysToSnakeCase<GuidelineLibrary>;

export const mapToGuidelineLibrary = (object: GuidelineLibraryApi): GuidelineLibrary => ({
    id: object.id,
    guidelineNavigationId: object.guideline_navigation_id,
    title: object.title,
});

export const mapToGuidelineLibraryApi = (object: Partial<GuidelineLibrary>): Partial<GuidelineLibraryApi> => ({
    id: object.id,
    guideline_navigation_id: object.guidelineNavigationId,
    title: object.title,
});

export const createNavigationLibrary = async (library: GuidelineLibraryCreate): Promise<GuidelineLibrary> => {
    const { result } = await HttpClient.post<GuidelineLibraryApi>(
        '/api/guideline-library',
        mapToGuidelineLibraryApi(library),
    );

    return mapToGuidelineLibrary(result.data);
};

export const updateNavigationLibrary = async (
    itemId: number,
    item: GuidelineLibraryPatch,
): Promise<GuidelineLibrary> => {
    const { result } = await HttpClient.patch<GuidelineLibraryApi>(
        `/api/guideline-library/${itemId}`,
        mapToGuidelineLibraryApi(item),
    );

    return mapToGuidelineLibrary(result.data);
};
