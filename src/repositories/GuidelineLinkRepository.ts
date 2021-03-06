/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GuidelineLink, GuidelineLinkCreate, GuidelineLinkPatch } from '../types';
import { HttpClient } from '../utilities/httpClient';

export type GuidelineLinkApi = CamelKeysToSnakeCase<GuidelineLink>;

export const mapToGuidelineLinkApi = (object: Partial<GuidelineLink>): Partial<GuidelineLinkApi> => ({
    id: object.id,
    guideline_navigation_id: object.guidelineNavigationId,
    title: object.title,
    url: object.url,
    open_in_new_tab: object.openInNewTab,
});

export const createNavigationLink = async (item: GuidelineLinkCreate): Promise<GuidelineLink> => {
    const { result } = await HttpClient.post<GuidelineLinkApi>('/api/guideline-link', mapToGuidelineLinkApi(item));

    return mapToGuidelineLink(result.data);
};

export const updateNavigationLink = async (itemId: number, item: GuidelineLinkPatch): Promise<GuidelineLink> => {
    const { result } = await HttpClient.patch<GuidelineLinkApi>(
        `/api/guideline-link/${itemId}`,
        mapToGuidelineLinkApi(item),
    );

    return mapToGuidelineLink(result.data);
};

export const mapToGuidelineLink = (object: GuidelineLinkApi): GuidelineLink => ({
    id: object.id,
    guidelineNavigationId: object.guideline_navigation_id,
    title: object.title,
    url: object.url,
    openInNewTab: object.open_in_new_tab,
});
