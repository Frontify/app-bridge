/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GuidelinePage, GuidelinePageCreate, GuidelinePagePatch } from '../types';
import { HttpClient } from '../utilities/httpClient';

export type GuidelinePageApi = CamelKeysToSnakeCase<GuidelinePage>;
type GuidelinePagePatchApi = CamelKeysToSnakeCase<GuidelinePagePatch>;

export const mapToGuidelinePage = (object: GuidelinePageApi): GuidelinePage => ({
    id: object.id,
    guidelineNavigationId: object.guideline_navigation_id,
    title: object.title,
    navigationTitle: object.navigation_title,
});

export const mapToGuidelinePageApi = (object: GuidelinePagePatch): GuidelinePagePatchApi => ({
    id: object.id,
    guideline_navigation_id: object.guidelineNavigationId,
    title: object.title,
    navigation_title: object.navigationTitle,
});

export const createNavigationPage = async (item: GuidelinePageCreate): Promise<GuidelinePage> => {
    const { result } = await HttpClient.post<GuidelinePageApi>('/api/guideline-page', mapToGuidelinePageApi(item));

    return mapToGuidelinePage(result.data);
};

export const updateNavigationPage = async (itemId: number, item: GuidelinePagePatch): Promise<GuidelinePage> => {
    const { result } = await HttpClient.patch<GuidelinePageApi>(
        `/api/guideline-page/${itemId}`,
        mapToGuidelinePageApi(item),
    );

    return mapToGuidelinePage(result.data);
};
