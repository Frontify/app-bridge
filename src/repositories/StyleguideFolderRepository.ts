/* (c) Copyright Frontify Ltd., all rights reserved. */

import { StyleguideFolder, StyleguideFolderCreate, StyleguideFolderPatch } from '../types';
import { HttpClient } from '../utilities/httpClient';

export type StyleguideFolderApi = {
    id: number;
    styleguide_navigation_id: number;
    title: string;
    dropdown: boolean;
};

export const mapToStyleguideFolderType = (object: StyleguideFolderApi): StyleguideFolder => ({
    id: object.id,
    styleguideNavigationId: object.styleguide_navigation_id,
    title: object.title,
    dropdown: object.dropdown,
});

export const mapToStyleguideFolderApi = (object: Partial<StyleguideFolder>): Partial<StyleguideFolderApi> => ({
    id: object.id,
    styleguide_navigation_id: object.styleguideNavigationId,
    title: object.title,
    dropdown: object.dropdown,
});

export const createNavigationFolder = async (folder: StyleguideFolderCreate): Promise<StyleguideFolder> => {
    const { result } = await HttpClient.post<StyleguideFolderApi>(
        '/api/styleguide-folder',
        mapToStyleguideFolderApi(folder),
    );

    return mapToStyleguideFolderType(result.data);
};

export const updateNavigationFolder = async (
    itemId: number,
    item: StyleguideFolderPatch,
): Promise<StyleguideFolder> => {
    const { result } = await HttpClient.patch<StyleguideFolderApi>(
        `/api/styleguide-folder/${itemId}`,
        mapToStyleguideFolderApi(item),
    );

    return mapToStyleguideFolderType(result.data);
};
