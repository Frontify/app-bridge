/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createNavigationLink, updateNavigationLink } from '../repositories/StyleguideLinkRepository';
import {
    createNavigationItem,
    deleteNavigationItem,
    duplicateNavigationItem,
    moveNavigationItem,
    moveNavigationItemToTrash,
    restoreNavigationItemFromTrash,
    updateNavigationItem,
} from '../repositories/StyleguideNavigationItemRepository';

import {
    GuidelineFolderCreate,
    GuidelineLinkCreate,
    GuidelineNavigationItem,
    GuidelineNavigationItemCreate,
    GuidelinePageCreate,
} from '../types';
import { createNavigationPage, updateNavigationPage } from '../repositories/StyleguidePageRepository';
import { createNavigationFolder, updateNavigationFolder } from '../repositories/StyleguideFolderRepository';
import { createNavigationLibrary, updateNavigationLibrary } from '../repositories/StyleguideLibraryRepository';
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
                styleguideFolderId: createdFolder.id,
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
                styleguidePageId: createdPage.id,
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
                styleguideLinkId: createdLink.id,
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
                styleguideLibraryId: createdLibrary.id,
                parentId,
            });
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const renameItem = async (title: string, item: GuidelineNavigationItem) => {
        try {
            if (item.styleguideFolderId) {
                await updateFolder(item.styleguideFolderId, { title });
            } else if (item.styleguidePageId) {
                await updatePage(item.styleguidePageId, { title });
            } else if (item.styleguideLinkId) {
                await updateLink(item.styleguideLinkId, { title });
            } else if (item.styleguideLibraryId) {
                await updateLibrary(item.styleguideLibraryId, { title });
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
