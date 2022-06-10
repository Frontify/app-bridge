/* (c) Copyright Frontify Ltd., all rights reserved. */

import { StyleguidePage, StyleguidePageCreate, StyleguidePagePatch } from '../types';
import { HttpClient } from '../utilities/httpClient';

export type StyleguidePageApi = {
    id: number;
    styleguide_navigation_id: number;
    title: string;
    navigation_title: string;
};

export const mapToStyleguidePageType = (object: StyleguidePageApi): StyleguidePage => ({
    id: object.id,
    styleguideNavigationId: object.styleguide_navigation_id,
    title: object.title,
    navigationTitle: object.navigation_title,
});

export const mapToStyleguidePageApi = (object: Partial<StyleguidePage>): Partial<StyleguidePageApi> => ({
    id: object.id,
    styleguide_navigation_id: object.styleguideNavigationId,
    title: object.title,
    navigation_title: object.navigationTitle,
});

export const createNavigationPage = async (item: StyleguidePageCreate): Promise<StyleguidePage> => {
    const { result } = await HttpClient.post<StyleguidePageApi>('/api/styleguide-page', mapToStyleguidePageApi(item));

    return mapToStyleguidePageType(result.data);
};

export const updateNavigationPage = async (itemId: number, item: StyleguidePagePatch): Promise<StyleguidePage> => {
    const { result } = await HttpClient.patch<StyleguidePageApi>(
        `/api/styleguide-page/${itemId}`,
        mapToStyleguidePageApi(item),
    );

    return mapToStyleguidePageType(result.data);
};
