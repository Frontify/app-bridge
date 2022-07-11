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
    guideline_navigation_id: number;
    parent_id: Nullable<number>;
    sort: Nullable<number>;
    published: boolean;
    guideline_page_id: Nullable<number>;
    guideline_folder_id: Nullable<number>;
    guideline_link_id: Nullable<number>;
    guideline_library_id: Nullable<number>;
    guideline_page: null;
    guideline_folder: null;
    guideline_link: null;
    guideline_library: null;
};

export type GuidelineNavigationItemApiEnriched = GuidelineNavigationItemApi & {
    guideline_page: Nullable<GuidelinePageApi>;
    guideline_folder: Nullable<GuidelineFolderApi>;
    guideline_link: Nullable<GuidelineLinkApi>;
    guideline_library: Nullable<GuidelineLibraryApi>;
};

export const getGuidelineNavigationItems = async (
    navigationId: number,
    ancestorId?: number,
): Promise<GuidelineNavigationItem[]> => {
    const queryParams = ancestorId ? `?ancestor_id=${ancestorId}` : '';
    const { result } = await HttpClient.get<GuidelineNavigationItemApi[]>(
        `/api/guideline-navigation/${navigationId}/item${queryParams}`,
    );
    return result.data.map(mapToGuidelineNavigationItemType);
};

export const createNavigationItem = async (item: GuidelineNavigationItemCreate): Promise<GuidelineNavigationItem> => {
    const { result } = await HttpClient.post<GuidelineNavigationItemApiEnriched>(
        '/api/guideline-navigation-item',
        mapToGuidelineNavigationItemApi(item),
    );

    return mapToGuidelineNavigationItemType(result.data);
};

export const updateNavigationItem = async (
    itemId: number,
    item: GuidelineNavigationItemPatch,
): Promise<GuidelineNavigationItem> => {
    const { result } = await HttpClient.patch<GuidelineNavigationItemApiEnriched>(
        `/api/guideline-navigation-item/${itemId}`,
        item,
    );

    return mapToGuidelineNavigationItemType(result.data);
};

export const deleteNavigationItem = async (itemId: number): Promise<boolean> => {
    const { result } = await HttpClient.delete(`/api/guideline-navigation-item/${itemId}`);

    return result.success;
};

export const duplicateNavigationItem = async (itemId: number): Promise<GuidelineNavigationItem> => {
    const { result } = await HttpClient.post<GuidelineNavigationItemApiEnriched>(
        `/api/guideline-navigation-item/${itemId}/duplicate`,
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
        `/api/guideline-navigation-item/${itemId}/move`,
        {
            target_guideline_navigation_id: destinationNavigationId,
            target_parent_id: destinationParentId,
            position_before_id: positionBeforeId,
        },
    );

    return mapToGuidelineNavigationItemType(result.data);
};

export const moveNavigationItemToTrash = async (itemId: number): Promise<boolean> => {
    const { result } = await HttpClient.post<GuidelineNavigationItemApiEnriched>(
        `/api/guideline-navigation-item/${itemId}/move-to-trash`,
    );

    return result.success;
};

export const restoreNavigationItemFromTrash = async (itemId: number): Promise<GuidelineNavigationItem> => {
    const { result } = await HttpClient.post<GuidelineNavigationItemApiEnriched>(
        `/api/guideline-navigation-item/${itemId}/restore-from-trash`,
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
    guidelineNavigationId: object.guideline_navigation_id,
    parentId: object.parent_id,
    sort: object.sort,
    published: object.published,
    guidelinePageId: object.guideline_page_id,
    guidelineFolderId: object.guideline_folder_id,
    guidelineLinkId: object.guideline_link_id,
    guidelineLibraryId: object.guideline_library_id,
    guidelinePage: object.guideline_page ? mapToGuidelinePageType(object.guideline_page) : null,
    guidelineFolder: object.guideline_folder ? mapToGuidelineFolderType(object.guideline_folder) : null,
    guidelineLink: object.guideline_link ? mapToGuidelineLinkType(object.guideline_link) : null,
    guidelineLibrary: object.guideline_library ? mapToGuidelineLibraryType(object.guideline_library) : null,

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
    guideline_navigation_id: object.guidelineNavigationId,
    parent_id: object.parentId,
    sort: object.sort,
    published: object.published,
    guideline_page_id: object.guidelinePageId,
    guideline_folder_id: object.guidelineFolderId,
    guideline_link_id: object.guidelineLinkId,
    guideline_library_id: object.guidelineLibraryId,
    guideline_page: null,
    guideline_folder: null,
    guideline_link: null,
    guideline_library: null,
});
