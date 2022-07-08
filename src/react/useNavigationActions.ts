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
                throw new Error('Invalid StyleguideNavigationItemType');
            }

            window.emitter.emit('GuidelineNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const updateFolder = async (id: number, patchItem: GuidelineFolderPatch) => {
        try {
            await updateNavigationFolder(id, patchItem);
            window.emitter.emit('GuidelineNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const updatePage = async (id: number, patchItem: GuidelinePagePatch) => {
        try {
            await updateNavigationPage(id, patchItem);
            window.emitter.emit('GuidelineNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const updateLink = async (id: number, patchItem: GuidelineLinkPatch) => {
        try {
            await updateNavigationLink(id, patchItem);
            window.emitter.emit('GuidelineNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const updateLibrary = async (id: number, patchItem: GuidelineLibraryPatch) => {
        try {
            await updateNavigationLibrary(id, patchItem);
            window.emitter.emit('GuidelineNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

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

    const toggleItemVisibility = async (id: number, published: boolean) => {
        try {
            await updateNavigationItem(id, { published });
            window.emitter.emit('GuidelineNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const moveItemToTrash = async (id: number) => {
        try {
            await moveNavigationItemToTrash(id);
            window.emitter.emit('GuidelineNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const createItem = async (item: GuidelineNavigationItemCreate) => {
        try {
            await createNavigationItem(item);
            window.emitter.emit('GuidelineNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const duplicateItem = async (id: number) => {
        try {
            await duplicateNavigationItem(id);
            window.emitter.emit('GuidelineNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const deleteItemPermanently = async (id: number) => {
        try {
            await deleteNavigationItem(id);
            window.emitter.emit('GuidelineNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const restoreItem = async (id: number) => {
        try {
            await restoreNavigationItemFromTrash(id);
            window.emitter.emit('GuidelineNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

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
