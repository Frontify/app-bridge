/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GuidelineLibrary, GuidelineLibraryCreate, GuidelineLibraryPatch } from '../types';
import { HttpClient } from '../utilities/httpClient';

export type StyleguideLibraryApi = {
    id: number;
    styleguide_navigation_id: number;
    title: string;
};

export const mapToStyleguideLibraryType = (object: StyleguideLibraryApi): GuidelineLibrary => ({
    id: object.id,
    guidelineNavigationId: object.styleguide_navigation_id,
    title: object.title,
});

export const mapToStyleguideLibraryApi = (object: Partial<GuidelineLibrary>): Partial<StyleguideLibraryApi> => ({
    id: object.id,
    styleguide_navigation_id: object.guidelineNavigationId,
    title: object.title,
});

export const createNavigationLibrary = async (library: GuidelineLibraryCreate): Promise<GuidelineLibrary> => {
    const { result } = await HttpClient.post<StyleguideLibraryApi>(
        '/api/styleguide-library',
        mapToStyleguideLibraryApi(library),
    );

    return mapToStyleguideLibraryType(result.data);
};

export const updateNavigationLibrary = async (
    itemId: number,
    item: GuidelineLibraryPatch,
): Promise<GuidelineLibrary> => {
    const { result } = await HttpClient.patch<StyleguideLibraryApi>(
        `/api/styleguide-library/${itemId}`,
        mapToStyleguideLibraryApi(item),
    );

    return mapToStyleguideLibraryType(result.data);
};
