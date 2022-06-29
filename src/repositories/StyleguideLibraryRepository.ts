/* (c) Copyright Frontify Ltd., all rights reserved. */

import { StyleguideLibrary, StyleguideLibraryCreate, StyleguideLibraryPatch } from '../types';
import { HttpClient } from '../utilities/httpClient';

export type StyleguideLibraryApi = {
    id: number;
    styleguide_navigation_id: number;
    title: string;
};

export const mapToStyleguideLibraryType = (object: StyleguideLibraryApi): StyleguideLibrary => ({
    id: object.id,
    styleguideNavigationId: object.styleguide_navigation_id,
    title: object.title,
});

export const mapToStyleguideLibraryApi = (object: Partial<StyleguideLibrary>): Partial<StyleguideLibraryApi> => ({
    id: object.id,
    styleguide_navigation_id: object.styleguideNavigationId,
    title: object.title,
});

export const createNavigationLibrary = async (library: StyleguideLibraryCreate): Promise<StyleguideLibrary> => {
    const { result } = await HttpClient.post<StyleguideLibraryApi>(
        '/api/styleguide-library',
        mapToStyleguideLibraryApi(library),
    );

    return mapToStyleguideLibraryType(result.data);
};

export const updateNavigationLibrary = async (
    itemId: number,
    item: StyleguideLibraryPatch,
): Promise<StyleguideLibrary> => {
    const { result } = await HttpClient.patch<StyleguideLibraryApi>(
        `/api/styleguide-library/${itemId}`,
        mapToStyleguideLibraryApi(item),
    );

    return mapToStyleguideLibraryType(result.data);
};
