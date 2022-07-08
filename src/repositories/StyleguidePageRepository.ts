/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GuidelinePage, GuidelinePageCreate, GuidelinePagePatch } from '../types';
import { HttpClient } from '../utilities/httpClient';

export type StyleguidePageApi = {
    id: number;
    styleguide_navigation_id: number;
    title: string;
    navigation_title: Nullable<string>;
};

export const mapToStyleguidePageType = (object: StyleguidePageApi): GuidelinePage => ({
    id: object.id,
    guidelineNavigationId: object.styleguide_navigation_id,
    title: object.title,
    navigationTitle: object.navigation_title,
});

export const mapToStyleguidePageApi = (object: Partial<GuidelinePage>): Partial<StyleguidePageApi> => ({
    id: object.id,
    styleguide_navigation_id: object.guidelineNavigationId,
    title: object.title,
    navigation_title: object.navigationTitle,
});

export const createNavigationPage = async (item: GuidelinePageCreate): Promise<GuidelinePage> => {
    const { result } = await HttpClient.post<StyleguidePageApi>('/api/styleguide-page', mapToStyleguidePageApi(item));

    return mapToStyleguidePageType(result.data);
};

export const updateNavigationPage = async (itemId: number, item: GuidelinePagePatch): Promise<GuidelinePage> => {
    const { result } = await HttpClient.patch<StyleguidePageApi>(
        `/api/styleguide-page/${itemId}`,
        mapToStyleguidePageApi(item),
    );

    return mapToStyleguidePageType(result.data);
};
