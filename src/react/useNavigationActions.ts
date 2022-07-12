/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createNavigationLink, updateNavigationLink } from '../repositories/GuidelineLinkRepository';
import {
    createNavigationItem,
    deleteNavigationItem,
    duplicateNavigationItem,
    moveNavigationItem,
    moveNavigationItemToTrash,
    restoreNavigationItemFromTrash,
    updateNavigationItem,
} from '../repositories/GuidelineNavigationItemRepository';

import {
    GuidelineFolderCreate,
    GuidelineLinkCreate,
    GuidelineNavigationItem,
    GuidelineNavigationItemCreate,
    GuidelinePageCreate,
} from '../types';
import { createNavigationPage, updateNavigationPage } from '../repositories/GuidelinePageRepository';
import { createNavigationFolder, updateNavigationFolder } from '../repositories/GuidelineFolderRepository';
import { createNavigationLibrary, updateNavigationLibrary } from '../repositories/GuidelineLibraryRepository';
import {
    GuidelineFolderPatch,
    GuidelineLibraryCreate,
    GuidelineLibraryPatch,
    GuidelineLinkPatch,
    GuidelinePagePatch,
} from '../types/Guideline';

export const useNavigationActions = () => {
    /**
     *
     * @param folder - folder data
     * @param parentId - id of parent navigation item
     *
     * @returns Promise<void>
     */
    const createFolder = async (folder: GuidelineFolderCreate, parentId: Nullable<number>) => {
        try {
            const createdFolder = await createNavigationFolder(folder);

            await createItem({
                guidelineNavigationId: folder.guidelineNavigationId,
                guidelineFolderId: createdFolder.id,
                parentId,
            });
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    /**
     *
     * @param page - page data
     * @param parentId - id of parent navigation item
     *
     * @returns Promise<void>
     */
    const createPage = async (page: GuidelinePageCreate, parentId: Nullable<number>) => {
        try {
            const createdPage = await createNavigationPage(page);

            await createItem({
                guidelineNavigationId: page.guidelineNavigationId,
                guidelinePageId: createdPage.id,
                parentId,
            });
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    /**
     *
     * @param link - link data
     * @param parentId - id of parent navigation item
     *
     * @returns Promise<void>
     */
    const createLink = async (link: GuidelineLinkCreate, parentId: Nullable<number>) => {
        try {
            const createdLink = await createNavigationLink(link);

            await createItem({
                guidelineNavigationId: link.guidelineNavigationId,
                guidelineLinkId: createdLink.id,
                parentId,
            });
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    /**
     *
     * @param library - library data
     * @param parentId - id of parent navigation item
     *
     * @returns Promise<void>
     */
    const createLibrary = async (library: GuidelineLibraryCreate, parentId: Nullable<number>) => {
        try {
            const createdLibrary = await createNavigationLibrary(library);

            await createItem({
                guidelineNavigationId: library.guidelineNavigationId,
                guidelineLibraryId: createdLibrary.id,
                parentId,
            });
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    /**
     *
     * @param title
     * @param item
     *
     * @returns Promise<void>
     */
    const renameItem = async (title: string, item: GuidelineNavigationItem) => {
        try {
            if (item.guidelineFolderId) {
                await updateFolder(item.guidelineFolderId, { title });
            } else if (item.guidelinePageId) {
                await updatePage(item.guidelinePageId, { title });
            } else if (item.guidelineLinkId) {
                await updateLink(item.guidelineLinkId, { title });
            } else if (item.guidelineLibraryId) {
                await updateLibrary(item.guidelineLibraryId, { title });
            } else {
                throw new Error('Invalid GuidelineNavigationItemType');
            }

            window.emitter.emit('GuidelineNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    /**
     *
     * @param id
     * @param folder - folder data
     *
     * @returns Promise<void>
     */
    const updateFolder = async (id: number, folder: GuidelineFolderPatch) => {
        try {
            await updateNavigationFolder(id, folder);
            window.emitter.emit('GuidelineNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    /**
     *
     * @param id
     * @param page - page data
     *
     * @returns Promise<void>
     */
    const updatePage = async (id: number, page: GuidelinePagePatch) => {
        try {
            await updateNavigationPage(id, page);
            window.emitter.emit('GuidelineNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    /**
     *
     * @param id
     * @param link - link data
     *
     * @returns Promise<void>
     */
    const updateLink = async (id: number, link: GuidelineLinkPatch) => {
        try {
            await updateNavigationLink(id, link);
            window.emitter.emit('GuidelineNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    /**
     *
     * @param id
     * @param library - library data
     *
     * @returns Promise<void>
     */
    const updateLibrary = async (id: number, library: GuidelineLibraryPatch) => {
        try {
            await updateNavigationLibrary(id, library);
            window.emitter.emit('GuidelineNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    /**
     *
     * @param id
     * @param destinationNavigationId
     * @param targetParentId
     * @param positionBeforeId
     *
     * @returns Promise<void>
     */
    const moveItem = async (
        id: number,
        destinationNavigationId: Nullable<number>,
        targetParentId: Nullable<number>,
        positionBeforeId: Nullable<number>,
    ) => {
        try {
            await moveNavigationItem(id, destinationNavigationId, targetParentId, positionBeforeId);
            window.emitter.emit('GuidelineNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    /**
     * Publish or unpublish navigation item
     * @remarks this function will update navigation item visibility
     *
     * @param id - navigation item id
     * @param publish - flag for showing or hiding item
     *
     * @returns Promise<void>
     */
    const toggleItemVisibility = async (id: number, publish: boolean) => {
        try {
            await updateNavigationItem(id, { published: publish });
            window.emitter.emit('GuidelineNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    /**
     * Moves navigation item to deleted area of navigation
     *
     * @param id - navigation item id
     *
     * @returns Promise<void>
     */
    const moveItemToTrash = async (id: number) => {
        try {
            await moveNavigationItemToTrash(id);
            window.emitter.emit('GuidelineNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    /**
     * Creates new navigation item
     *
     * @param item - navigation item data
     *
     * @returns Promise<void>
     */
    const createItem = async (item: GuidelineNavigationItemCreate) => {
        try {
            await createNavigationItem(item);
            window.emitter.emit('GuidelineNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    /**
     * Duplicates navigation item without sorting
     *
     * @param id - navigation item id
     *
     * @returns Promise<void>
     */
    const duplicateItem = async (id: number) => {
        try {
            await duplicateNavigationItem(id);
            window.emitter.emit('GuidelineNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    /**
     * Permanently deletes navigation item
     *
     * @param id - navigation item id
     *
     * @returns Promise<void>
     */
    const deleteItemPermanently = async (id: number) => {
        try {
            await deleteNavigationItem(id);
            window.emitter.emit('GuidelineNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    /**
     * Restores navigation item from deleted area of navigation
     *
     * @param id - navigation item id
     *
     * @returns Promise<void>
     */
    const restoreItem = async (id: number) => {
        try {
            await restoreNavigationItemFromTrash(id);
            window.emitter.emit('GuidelineNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    /**
     *
     * @param folderId
     * @param dropdown
     *
     * @returns Promise<void>
     */
    const toggleFolderDropdown = async (folderId: number, dropdown: boolean) => {
        try {
            await updateNavigationFolder(folderId, {
                dropdown,
            });
            window.emitter.emit('GuidelineNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    /**
     *
     * @param id
     * @param navigationId
     * @param parentId
     * @param positionBeforeId
     *
     * @returns Promise<void>
     */
    const sortItems = async (
        id: number,
        navigationId: Nullable<number>,
        parentId: Nullable<number>,
        positionBeforeId: Nullable<number>,
    ) => {
        try {
            await moveNavigationItem(id, navigationId, parentId, positionBeforeId);
            window.emitter.emit('GuidelineNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    return {
        createLibrary,
        createLink,
        createPage,
        createFolder,
        deleteItemPermanently,
        duplicateItem,
        moveItem,
        moveItemToTrash,
        renameItem,
        restoreItem,
        sortItems,
        toggleFolderDropdown,
        updateFolder,
        updateLibrary,
        updateLink,
        updatePage,
        toggleItemVisibility,
        createItem,
    };
};
