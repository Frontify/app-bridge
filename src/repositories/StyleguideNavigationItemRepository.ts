/* (c) Copyright Frontify Ltd., all rights reserved. */

import { HttpClient } from '../utilities/httpClient';
import { GuidelineNavigationItem, GuidelineNavigationItemCreate, GuidelineNavigationItemPatch } from '../types';
import { StyleguideLinkApi, mapToStyleguideLinkType } from './StyleguideLinkRepository';
import { StyleguidePageApi, mapToStyleguidePageType } from './StyleguidePageRepository';
import { StyleguideFolderApi, mapToStyleguideFolderType } from './StyleguideFolderRepository';
import { StyleguideLibraryApi, mapToStyleguideLibraryType } from './StyleguideLibraryRepository';

export type StyleguideNavigationItemApi = {
    id: number;
    creator: number;
    created: string;
    modifier: Nullable<number>;
    modified: Nullable<string>;
    valid_to: Nullable<string>;
    styleguide_navigation_id: number;
    parent_id: Nullable<number>;
    sort: Nullable<number>;
    published: boolean;
    styleguide_page_id: Nullable<number>;
    styleguide_folder_id: Nullable<number>;
    styleguide_link_id: Nullable<number>;
    styleguide_library_id: Nullable<number>;
    styleguide_page: null;
    styleguide_folder: null;
    styleguide_link: null;
    styleguide_library: null;
};

export type StyleguideNavigationItemApiEnriched = StyleguideNavigationItemApi & {
    styleguide_page: Nullable<StyleguidePageApi>;
    styleguide_folder: Nullable<StyleguideFolderApi>;
    styleguide_link: Nullable<StyleguideLinkApi>;
    styleguide_library: Nullable<StyleguideLibraryApi>;
};

export const getStyleguideNavigationItems = async (
    navigationId: number,
    ancestorId?: number,
): Promise<GuidelineNavigationItem[]> => {
    const queryParams = ancestorId ? `?ancestor_id=${ancestorId}` : '';
    const { result } = await HttpClient.get<StyleguideNavigationItemApi[]>(
        `/api/styleguide-navigation/${navigationId}/item${queryParams}`,
    );
    return result.data.map(mapToStyleguideNavigationItemType);
};

export const createNavigationItem = async (item: GuidelineNavigationItemCreate): Promise<GuidelineNavigationItem> => {
    const { result } = await HttpClient.post<StyleguideNavigationItemApiEnriched>(
        '/api/styleguide-navigation-item',
        mapToStyleguideNavigationItemApi(item),
    );

    return mapToStyleguideNavigationItemType(result.data);
};

export const updateNavigationItem = async (
    itemId: number,
    item: GuidelineNavigationItemPatch,
): Promise<GuidelineNavigationItem> => {
    const { result } = await HttpClient.patch<StyleguideNavigationItemApiEnriched>(
        `/api/styleguide-navigation-item/${itemId}`,
        item,
    );

    return mapToStyleguideNavigationItemType(result.data);
};

export const deleteNavigationItem = async (itemId: number): Promise<boolean> => {
    const { result } = await HttpClient.delete(`/api/styleguide-navigation-item/${itemId}`);

    return result.success;
};

export const duplicateNavigationItem = async (itemId: number): Promise<GuidelineNavigationItem> => {
    const { result } = await HttpClient.post<StyleguideNavigationItemApiEnriched>(
        `/api/styleguide-navigation-item/${itemId}/duplicate`,
        {
            suffix: '(Copy)',
        },
    );

    return mapToStyleguideNavigationItemType(result.data);
};

export const moveNavigationItem = async (
    itemId: number,
    destinationNavigationId: Nullable<number>,
    destinationParentId: Nullable<number>,
    positionBeforeId: Nullable<number>,
): Promise<GuidelineNavigationItem> => {
    const { result } = await HttpClient.post<StyleguideNavigationItemApiEnriched>(
        `/api/styleguide-navigation-item/${itemId}/move`,
        {
            target_styleguide_navigation_id: destinationNavigationId,
            target_parent_id: destinationParentId,
            position_before_id: positionBeforeId,
        },
    );

    return mapToStyleguideNavigationItemType(result.data);
};

export const moveNavigationItemToTrash = async (itemId: number): Promise<boolean> => {
    const { result } = await HttpClient.post<StyleguideNavigationItemApiEnriched>(
        `/api/styleguide-navigation-item/${itemId}/move-to-trash`,
    );

    return result.success;
};

export const restoreNavigationItemFromTrash = async (itemId: number): Promise<GuidelineNavigationItem> => {
    const { result } = await HttpClient.post<StyleguideNavigationItemApiEnriched>(
        `/api/styleguide-navigation-item/${itemId}/restore-from-trash`,
    );

    return mapToStyleguideNavigationItemType(result.data);
};

const mapToStyleguideNavigationItemType = (object: StyleguideNavigationItemApiEnriched): GuidelineNavigationItem => ({
    id: object.id,
    creator: object.creator,
    created: object.created,
    modifier: object.modifier,
    modified: object.modified,
    validTo: object.valid_to,
    guidelineNavigationId: object.styleguide_navigation_id,
    parentId: object.parent_id,
    sort: object.sort,
    published: object.published,
    styleguidePageId: object.styleguide_page_id,
    styleguideFolderId: object.styleguide_folder_id,
    styleguideLinkId: object.styleguide_link_id,
    styleguideLibraryId: object.styleguide_library_id,
    styleguidePage: object.styleguide_page ? mapToStyleguidePageType(object.styleguide_page) : null,
    styleguideFolder: object.styleguide_folder ? mapToStyleguideFolderType(object.styleguide_folder) : null,
    styleguideLink: object.styleguide_link ? mapToStyleguideLinkType(object.styleguide_link) : null,
    styleguideLibrary: object.styleguide_library ? mapToStyleguideLibraryType(object.styleguide_library) : null,

    // Enriched
    dropdownItems: [],
});

export const mapToStyleguideNavigationItemApi = (
    object: Partial<GuidelineNavigationItem>,
): Partial<StyleguideNavigationItemApi> => ({
    id: object.id,
    creator: object.creator,
    created: object.created,
    modifier: object.modifier,
    modified: object.modified,
    valid_to: object.validTo,
    styleguide_navigation_id: object.guidelineNavigationId,
    parent_id: object.parentId,
    sort: object.sort,
    published: object.published,
    styleguide_page_id: object.styleguidePageId,
    styleguide_folder_id: object.styleguideFolderId,
    styleguide_link_id: object.styleguideLinkId,
    styleguide_library_id: object.styleguideLibraryId,
    styleguide_page: null,
    styleguide_folder: null,
    styleguide_link: null,
    styleguide_library: null,
});
