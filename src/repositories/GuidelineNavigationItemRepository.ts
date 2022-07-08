/* (c) Copyright Frontify Ltd., all rights reserved. */

import { HttpClient } from '../utilities/httpClient';
import { GuidelineNavigationItem, GuidelineNavigationItemCreate, GuidelineNavigationItemPatch } from '../types';
import { GuidelineLinkApi, mapToGuidelineLinkType } from './GuidelineLinkRepository';
import { GuidelinePageApi, mapToGuidelinePageType } from './GuidelinePageRepository';
import { GuidelineFolderApi, mapToGuidelineFolderType } from './GuidelineFolderRepository';
import { GuidelineLibraryApi, mapToGuidelineLibraryType } from './GuidelineLibraryRepository';

export type GuidelineNavigationItemApi = {
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

export type GuidelineNavigationItemApiEnriched = GuidelineNavigationItemApi & {
    styleguide_page: Nullable<GuidelinePageApi>;
    styleguide_folder: Nullable<GuidelineFolderApi>;
    styleguide_link: Nullable<GuidelineLinkApi>;
    styleguide_library: Nullable<GuidelineLibraryApi>;
};

export const getGuidelineNavigationItems = async (
    navigationId: number,
    ancestorId?: number,
): Promise<GuidelineNavigationItem[]> => {
    const queryParams = ancestorId ? `?ancestor_id=${ancestorId}` : '';
    const { result } = await HttpClient.get<GuidelineNavigationItemApi[]>(
        `/api/styleguide-navigation/${navigationId}/item${queryParams}`,
    );
    return result.data.map(mapToGuidelineNavigationItemType);
};

export const createNavigationItem = async (item: GuidelineNavigationItemCreate): Promise<GuidelineNavigationItem> => {
    const { result } = await HttpClient.post<GuidelineNavigationItemApiEnriched>(
        '/api/styleguide-navigation-item',
        mapToGuidelineNavigationItemApi(item),
    );

    return mapToGuidelineNavigationItemType(result.data);
};

export const updateNavigationItem = async (
    itemId: number,
    item: GuidelineNavigationItemPatch,
): Promise<GuidelineNavigationItem> => {
    const { result } = await HttpClient.patch<GuidelineNavigationItemApiEnriched>(
        `/api/styleguide-navigation-item/${itemId}`,
        item,
    );

    return mapToGuidelineNavigationItemType(result.data);
};

export const deleteNavigationItem = async (itemId: number): Promise<boolean> => {
    const { result } = await HttpClient.delete(`/api/styleguide-navigation-item/${itemId}`);

    return result.success;
};

export const duplicateNavigationItem = async (itemId: number): Promise<GuidelineNavigationItem> => {
    const { result } = await HttpClient.post<GuidelineNavigationItemApiEnriched>(
        `/api/styleguide-navigation-item/${itemId}/duplicate`,
        {
            suffix: '(Copy)',
        },
    );

    return mapToGuidelineNavigationItemType(result.data);
};

export const moveNavigationItem = async (
    itemId: number,
    destinationNavigationId: Nullable<number>,
    destinationParentId: Nullable<number>,
    positionBeforeId: Nullable<number>,
): Promise<GuidelineNavigationItem> => {
    const { result } = await HttpClient.post<GuidelineNavigationItemApiEnriched>(
        `/api/styleguide-navigation-item/${itemId}/move`,
        {
            target_styleguide_navigation_id: destinationNavigationId,
            target_parent_id: destinationParentId,
            position_before_id: positionBeforeId,
        },
    );

    return mapToGuidelineNavigationItemType(result.data);
};

export const moveNavigationItemToTrash = async (itemId: number): Promise<boolean> => {
    const { result } = await HttpClient.post<GuidelineNavigationItemApiEnriched>(
        `/api/styleguide-navigation-item/${itemId}/move-to-trash`,
    );

    return result.success;
};

export const restoreNavigationItemFromTrash = async (itemId: number): Promise<GuidelineNavigationItem> => {
    const { result } = await HttpClient.post<GuidelineNavigationItemApiEnriched>(
        `/api/styleguide-navigation-item/${itemId}/restore-from-trash`,
    );

    return mapToGuidelineNavigationItemType(result.data);
};

const mapToGuidelineNavigationItemType = (object: GuidelineNavigationItemApiEnriched): GuidelineNavigationItem => ({
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
    guidelinePageId: object.styleguide_page_id,
    guidelineFolderId: object.styleguide_folder_id,
    guidelineLinkId: object.styleguide_link_id,
    guidelineLibraryId: object.styleguide_library_id,
    guidelinePage: object.styleguide_page ? mapToGuidelinePageType(object.styleguide_page) : null,
    guidelineFolder: object.styleguide_folder ? mapToGuidelineFolderType(object.styleguide_folder) : null,
    guidelineLink: object.styleguide_link ? mapToGuidelineLinkType(object.styleguide_link) : null,
    guidelineLibrary: object.styleguide_library ? mapToGuidelineLibraryType(object.styleguide_library) : null,

    // Enriched
    dropdownItems: [],
});

export const mapToGuidelineNavigationItemApi = (
    object: Partial<GuidelineNavigationItem>,
): Partial<GuidelineNavigationItemApi> => ({
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
    styleguide_page_id: object.guidelinePageId,
    styleguide_folder_id: object.guidelineFolderId,
    styleguide_link_id: object.guidelineLinkId,
    styleguide_library_id: object.guidelineLibraryId,
    styleguide_page: null,
    styleguide_folder: null,
    styleguide_link: null,
    styleguide_library: null,
});
