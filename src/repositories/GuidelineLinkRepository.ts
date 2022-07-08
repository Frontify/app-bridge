/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GuidelineLink, GuidelineLinkCreate, GuidelineLinkPatch } from '../types';
import { HttpClient } from '../utilities/httpClient';

export type GuidelineLinkApi = {
    id: number;
    styleguide_navigation_id: number;
    title: string;
    url: string;
    open_in_new_tab: boolean;
};

export const mapToGuidelineLinkApi = (object: Partial<GuidelineLink>): Partial<GuidelineLinkApi> => ({
    id: object.id,
    styleguide_navigation_id: object.guidelineNavigationId,
    title: object.title,
    url: object.url,
    open_in_new_tab: object.openInNewTab,
});

export const createNavigationLink = async (item: GuidelineLinkCreate): Promise<GuidelineLink> => {
    const { result } = await HttpClient.post<GuidelineLinkApi>('/api/styleguide-link', mapToGuidelineLinkApi(item));

    return mapToGuidelineLinkType(result.data);
};

export const updateNavigationLink = async (itemId: number, item: GuidelineLinkPatch): Promise<GuidelineLink> => {
    const { result } = await HttpClient.patch<GuidelineLinkApi>(
        `/api/styleguide-link/${itemId}`,
        mapToGuidelineLinkApi(item),
    );

    return mapToGuidelineLinkType(result.data);
};

export const mapToGuidelineLinkType = (object: GuidelineLinkApi): GuidelineLink => ({
    id: object.id,
    guidelineNavigationId: object.styleguide_navigation_id,
    title: object.title,
    url: object.url,
    openInNewTab: object.open_in_new_tab,
});
