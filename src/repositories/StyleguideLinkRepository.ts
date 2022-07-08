/* (c) Copyright Frontify Ltd., all rights reserved. */

import { GuidelineLink, GuidelineLinkCreate, GuidelineLinkPatch } from '../types';
import { HttpClient } from '../utilities/httpClient';

export type StyleguideLinkApi = {
    id: number;
    styleguide_navigation_id: number;
    title: string;
    url: string;
    open_in_new_tab: boolean;
};

export const mapToStyleguideLinkApi = (object: Partial<GuidelineLink>): Partial<StyleguideLinkApi> => ({
    id: object.id,
    styleguide_navigation_id: object.styleguideNavigationId,
    title: object.title,
    url: object.url,
    open_in_new_tab: object.openInNewTab,
});

export const createNavigationLink = async (item: GuidelineLinkCreate): Promise<GuidelineLink> => {
    const { result } = await HttpClient.post<StyleguideLinkApi>('/api/styleguide-link', mapToStyleguideLinkApi(item));

    return mapToStyleguideLinkType(result.data);
};

export const updateNavigationLink = async (itemId: number, item: GuidelineLinkPatch): Promise<GuidelineLink> => {
    const { result } = await HttpClient.patch<StyleguideLinkApi>(
        `/api/styleguide-link/${itemId}`,
        mapToStyleguideLinkApi(item),
    );

    return mapToStyleguideLinkType(result.data);
};

export const mapToStyleguideLinkType = (object: StyleguideLinkApi): GuidelineLink => ({
    id: object.id,
    styleguideNavigationId: object.styleguide_navigation_id,
    title: object.title,
    url: object.url,
    openInNewTab: object.open_in_new_tab,
});
