/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GuidelineLibrary, GuidelineLibraryCreate, GuidelineLibraryPatch } from '../types';
import { HttpClient } from '../utilities/httpClient';

export type GuidelineLibraryApi = {
    id: number;
    styleguide_navigation_id: number;
    title: string;
};

export const mapToGuidelineLibraryType = (object: GuidelineLibraryApi): GuidelineLibrary => ({
    id: object.id,
    guidelineNavigationId: object.styleguide_navigation_id,
    title: object.title,
});

export const mapToGuidelineLibraryApi = (object: Partial<GuidelineLibrary>): Partial<GuidelineLibraryApi> => ({
    id: object.id,
    styleguide_navigation_id: object.guidelineNavigationId,
    title: object.title,
});

export const createNavigationLibrary = async (library: GuidelineLibraryCreate): Promise<GuidelineLibrary> => {
    const { result } = await HttpClient.post<GuidelineLibraryApi>(
        '/api/styleguide-library',
        mapToGuidelineLibraryApi(library),
    );

    return mapToGuidelineLibraryType(result.data);
};

export const updateNavigationLibrary = async (
    itemId: number,
    item: GuidelineLibraryPatch,
): Promise<GuidelineLibrary> => {
    const { result } = await HttpClient.patch<GuidelineLibraryApi>(
        `/api/styleguide-library/${itemId}`,
        mapToGuidelineLibraryApi(item),
    );

    return mapToGuidelineLibraryType(result.data);
};
