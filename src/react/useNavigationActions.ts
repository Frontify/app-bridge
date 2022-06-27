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
    StyleguideFolderCreate,
    StyleguideLinkCreate,
    StyleguideNavigationItem,
    StyleguideNavigationItemCreate,
    StyleguidePageCreate,
} from '../types';
import { createNavigationPage, updateNavigationPage } from '../repositories/StyleguidePageRepository';
import { createNavigationFolder, updateNavigationFolder } from '../repositories/StyleguideFolderRepository';
import { createNavigationLibrary, updateNavigationLibrary } from '../repositories/StyleguideLibraryRepository';
import {
    StyleguideFolderPatch,
    StyleguideLibraryCreate,
    StyleguideLibraryPatch,
    StyleguideLinkPatch,
    StyleguidePagePatch,
} from '../types/Styleguide';

export const useNavigationActions = () => {
    const createFolder = async (folder: StyleguideFolderCreate, parentId: Nullable<number>) => {
        try {
            const createdFolder = await createNavigationFolder(folder);

            await createItem({
                styleguideNavigationId: folder.styleguideNavigationId,
                styleguideFolderId: createdFolder.id,
                parentId,
            });
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const createPage = async (page: StyleguidePageCreate, parentId: Nullable<number>) => {
        try {
            const createdPage = await createNavigationPage(page);

            await createItem({
                styleguideNavigationId: page.styleguideNavigationId,
                styleguidePageId: createdPage.id,
                parentId,
            });
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const createLink = async (link: StyleguideLinkCreate, parentId: Nullable<number>) => {
        try {
            const createdLink = await createNavigationLink(link);

            await createItem({
                styleguideNavigationId: link.styleguideNavigationId,
                styleguideLinkId: createdLink.id,
                parentId,
            });
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const createLibrary = async (library: StyleguideLibraryCreate, parentId: Nullable<number>) => {
        try {
            const createdLibrary = await createNavigationLibrary(library);

            await createItem({
                styleguideNavigationId: library.styleguideNavigationId,
                styleguideLibraryId: createdLibrary.id,
                parentId,
            });
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const renameItem = async (title: string, item: StyleguideNavigationItem) => {
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

            window.emitter.emit('StyleguideNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const updateFolder = async (itemId: number, patchItem: StyleguideFolderPatch) => {
        try {
            await updateNavigationFolder(itemId, patchItem);
            window.emitter.emit('StyleguideNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const updatePage = async (itemId: number, patchItem: StyleguidePagePatch) => {
        try {
            await updateNavigationPage(itemId, patchItem);
            window.emitter.emit('StyleguideNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const updateLink = async (itemId: number, patchItem: StyleguideLinkPatch) => {
        try {
            await updateNavigationLink(itemId, patchItem);
            window.emitter.emit('StyleguideNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const updateLibrary = async (itemId: number, patchItem: StyleguideLibraryPatch) => {
        try {
            await updateNavigationLibrary(itemId, patchItem);
            window.emitter.emit('StyleguideNavigationUpdated');
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
            window.emitter.emit('StyleguideNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const toggleItemVisibility = async (itemId: number, published: boolean) => {
        try {
            await updateNavigationItem(itemId, { published });
            window.emitter.emit('StyleguideNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const moveItemToTrash = async (itemId: number) => {
        try {
            await moveNavigationItemToTrash(itemId);
            window.emitter.emit('StyleguideNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const createItem = async (item: StyleguideNavigationItemCreate) => {
        try {
            await createNavigationItem(item);
            window.emitter.emit('StyleguideNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const duplicateItem = async (id: number) => {
        try {
            await duplicateNavigationItem(id);
            window.emitter.emit('StyleguideNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const deleteItemPermanently = async (id: number) => {
        try {
            await deleteNavigationItem(id);
            window.emitter.emit('StyleguideNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const restoreItem = async (id: number) => {
        try {
            await restoreNavigationItemFromTrash(id);
            window.emitter.emit('StyleguideNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const toggleFolderDropdown = async (folderId: number, dropdown: boolean) => {
        try {
            await updateNavigationFolder(folderId, {
                dropdown,
            });
            window.emitter.emit('StyleguideNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const sortItems = async (itemId: number, parentId: Nullable<number>, positionBeforeId: Nullable<number>) => {
        try {
            await moveNavigationItem(itemId, null, parentId, positionBeforeId);
            window.emitter.emit('StyleguideNavigationUpdated');
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
