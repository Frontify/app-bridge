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
    StyleguideFolderPatch,
    StyleguideLibraryPatch,
    StyleguideLinkCreate,
    StyleguideLinkPatch,
    StyleguideNavigationItem,
    StyleguideNavigationItemCreate,
    StyleguidePageCreate,
    StyleguidePagePatch,
} from '../types';
import { createNavigationLibrary, updateNavigationLibrary } from '../repositories/StyleguideLibraryRepository';
import { createNavigationFolder, updateNavigationFolder } from '../repositories/StyleguideFolderRepository';
import { createNavigationPage, updateNavigationPage } from '../repositories/StyleguidePageRepository';
import { StyleguideLibraryCreate } from '../types/Styleguide';

export const useNavigationItem = () => {
    const addFolderAction = async (folder: StyleguideFolderCreate, parentId: number) => {
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

    const addPageAction = async (page: StyleguidePageCreate, parentId: number) => {
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

    const addLinkAction = async (link: StyleguideLinkCreate, parentId: number) => {
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

    const addLibraryAction = async (library: StyleguideLibraryCreate, parentId: number) => {
        try {
            const createdlibrary = await createNavigationLibrary(library);

            await createItem({
                styleguideNavigationId: library.styleguideNavigationId,
                styleguideLibraryId: createdlibrary.id,
                parentId,
            });
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const renameItem = async (
        patchItem: StyleguidePagePatch | StyleguideFolderPatch | StyleguideLinkPatch | StyleguideLibraryPatch,
        item: StyleguideNavigationItem,
    ) => {
        try {
            if (item.styleguideFolderId) {
                await updateNavigationFolder(item.styleguideFolderId, patchItem);
            } else if (item.styleguidePageId) {
                await updateNavigationPage(item.styleguidePageId, patchItem);
            } else if (item.styleguideLinkId) {
                await updateNavigationLink(item.styleguideLinkId, patchItem);
            } else if (item.styleguideLibraryId) {
                await updateNavigationLibrary(item.styleguideLibraryId, patchItem);
            } else {
                throw new Error('Invalid StyleguideNavigationItemType');
            }

            window.emitter.emit('StyleguideNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    const moveItem = async (id: number, destinationNavigationId: number, targetParentId: Nullable<string>) => {
        try {
            await moveNavigationItem(id, destinationNavigationId, targetParentId);
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

    const sortItems = async (itemId: number, parentId: Nullable<string>, positionBeforeId: Nullable<string>) => {
        try {
            await moveNavigationItem(itemId, null, parentId, positionBeforeId);
            window.emitter.emit('StyleguideNavigationUpdated');
        } catch (event) {
            console.error('Error: ', event);
        }
    };

    return {
        addFolderAction,
        addLinkAction,
        addLibraryAction,
        addPageAction,
        renameItem,
        moveItem,
        moveItemToTrash,
        toggleItemVisibility,
        duplicateItem,
        createItem,
        deleteItemPermanently,
        restoreItem,
        toggleFolderDropdown,
        sortItems,
    };
};
