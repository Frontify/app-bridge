/* (c) Copyright Frontify Ltd., all rights reserved. */

import { StyleguideLink, StyleguideLinkCreate, StyleguideLinkPatch } from '../types';
import { HttpClient } from '../utilities/httpClient';

export type StyleguideLinkApi = {
    id: number;
    styleguide_navigation_id: number;
    title: string;
    url: string;
    open_in_new_tab: boolean;
};

export const mapToStyleguideLinkApi = (object: Partial<StyleguideLink>): Partial<StyleguideLinkApi> => ({
    id: object.id,
    styleguide_navigation_id: object.styleguideNavigationId,
    title: object.title,
    url: object.url,
    open_in_new_tab: object.openInNewTab,
});

export const createNavigationLink = async (item: StyleguideLinkCreate): Promise<StyleguideLink> => {
    const { result } = await HttpClient.post<StyleguideLinkApi>('/api/styleguide-link', mapToStyleguideLinkApi(item));

    return mapToStyleguideLinkType(result.data);
};

export const updateNavigationLink = async (itemId: number, item: StyleguideLinkPatch): Promise<StyleguideLink> => {
    const { result } = await HttpClient.patch<StyleguideLinkApi>(
        `/api/styleguide-link/${itemId}`,
        mapToStyleguideLinkApi(item),
    );

    return mapToStyleguideLinkType(result.data);
};

export const mapToStyleguideLinkType = (object: StyleguideLinkApi): StyleguideLink => ({
    id: object.id,
    styleguideNavigationId: object.styleguide_navigation_id,
    title: object.title,
    url: object.url,
    openInNewTab: object.open_in_new_tab,
});
