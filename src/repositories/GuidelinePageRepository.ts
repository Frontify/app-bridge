/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GuidelinePage, GuidelinePageCreate, GuidelinePagePatch } from '../types';
import { HttpClient } from '../utilities/httpClient';

export type GuidelinePageApi = {
    id: number;
    guideline_navigation_id: number;
    title: string;
    navigation_title: Nullable<string>;
};

export const mapToGuidelinePageType = (object: GuidelinePageApi): GuidelinePage => ({
    id: object.id,
    guidelineNavigationId: object.guideline_navigation_id,
    title: object.title,
    navigationTitle: object.navigation_title,
});

export const mapToGuidelinePageApi = (object: Partial<GuidelinePage>): Partial<GuidelinePageApi> => ({
    id: object.id,
    guideline_navigation_id: object.guidelineNavigationId,
    title: object.title,
    navigation_title: object.navigationTitle,
});

export const createNavigationPage = async (item: GuidelinePageCreate): Promise<GuidelinePage> => {
    const { result } = await HttpClient.post<GuidelinePageApi>('/api/guideline-page', mapToGuidelinePageApi(item));

    return mapToGuidelinePageType(result.data);
};

export const updateNavigationPage = async (itemId: number, item: GuidelinePagePatch): Promise<GuidelinePage> => {
    const { result } = await HttpClient.patch<GuidelinePageApi>(
        `/api/guideline-page/${itemId}`,
        mapToGuidelinePageApi(item),
    );

    return mapToGuidelinePageType(result.data);
};
