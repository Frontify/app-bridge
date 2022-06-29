/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mountHook } from '@cypress/react';
import { useNavigationActions } from './useNavigationActions';

describe('useNavigationActions', () => {
    it('adds new folder', () => {
        const mockFolder = {
            dropdown: false,
            styleguideNavigationId: 2,
            title: 'Some Title',
        };
        const createFolderResponse = {
            data: {
                created: '2022-06-08T13:14:47.000+00:00',
                creator: 1,
                dropdown: false,
                id: 18,
                modified: null,
                modifier: null,
                styleguideNavigationId: 2,
                title: 'Some title',
                valid_to: null,
            },
        };
        mountHook(() => useNavigationActions()).then((result) => {
            result.current?.createFolder(mockFolder, 2);
            cy.intercept(
                { method: 'POST', url: '/api/styleguide-folder' },
                {
                    body: createFolderResponse,
                },
            ).as('createNewFolder');

            cy.intercept(
                { method: 'POST', url: '/api/styleguide-navigation-item' },
                {
                    body: { success: true },
                },
            ).as('createNewItem');
            cy.wait('@createNewFolder').its('response.statusCode').should('eq', 200);
            cy.wait('@createNewItem').its('response.statusCode').should('eq', 200);
        });
    });

    it('adds new page', () => {
        const mockPage = {
            navigationTitle: '',
            styleguideNavigationId: 2,
            title: 'Some page',
        };
        const createPageResponse = {
            data: {
                created: '2022-06-08T13:14:47.000+00:00',
                creator: 1,
                dropdown: false,
                id: 18,
                modified: null,
                modifier: null,
                styleguideNavigationId: 2,
                title: 'Some page',
                validTo: null,
            },
        };
        mountHook(() => useNavigationActions()).then((result) => {
            result.current?.createPage(mockPage, 1);
            cy.intercept(
                { method: 'POST', url: '/api/styleguide-page' },
                {
                    body: createPageResponse,
                },
            ).as('createNewPage');

            cy.intercept(
                { method: 'POST', url: '/api/styleguide-navigation-item' },
                {
                    body: { success: true },
                },
            ).as('createNewItem');
            cy.wait('@createNewPage').its('response.statusCode').should('eq', 200);
            cy.wait('@createNewItem').its('response.statusCode').should('eq', 200);
        });
    });

    it('adds new link', () => {
        const mockLink = {
            openInNewTab: false,
            styleguideNavigationId: 2,
            title: 'Some link',
            url: 'https://www.link.com',
        };
        const createLinkResponse = {
            data: {
                created: '2022-06-08T14:54:27.000+00:00',
                creator: 1,
                id: 1,
                modified: null,
                modifier: null,
                openInNewTab: false,
                styleguideNavigationId: 2,
                title: 'Some link',
                url: 'https://www.sdf.df',
                validTo: null,
            },
        };
        mountHook(() => useNavigationActions()).then((result) => {
            result.current?.createLink(mockLink, 1);
            cy.intercept(
                { method: 'POST', url: '/api/styleguide-link' },
                {
                    body: createLinkResponse,
                },
            ).as('createNewLink');

            cy.intercept(
                { method: 'POST', url: '/api/styleguide-navigation-item' },
                {
                    body: { success: true },
                },
            ).as('createNewItem');
            cy.wait('@createNewLink').its('response.statusCode').should('eq', 200);
            cy.wait('@createNewItem').its('response.statusCode').should('eq', 200);
        });
    });

    it('moves item', () => {
        const itemId = 1;
        const targetParentId = 3;
        const positionBeforeId = 2;
        const targetStyleguideNavigationId = 2;

        mountHook(() => useNavigationActions()).then((result) => {
            result.current?.moveItem(itemId, targetStyleguideNavigationId, targetParentId, positionBeforeId);
            cy.intercept(
                { method: 'POST', url: `/api/styleguide-navigation-item/${itemId}/move` },
                {
                    body: {
                        target_styleguide_navigation_id: targetStyleguideNavigationId,
                    },
                },
            ).as('moveItem');

            cy.wait('@moveItem').its('response.statusCode').should('eq', 200);
        });
    });

    it('toggles visibility', () => {
        const itemId = 1;
        const published = true;
        mountHook(() => useNavigationActions()).then((result) => {
            result.current?.toggleItemVisibility(itemId, published);
            cy.intercept(
                { method: 'PATCH', url: `/api/styleguide-navigation-item/${itemId}` },
                {
                    body: {
                        published,
                    },
                },
            ).as('toggleVisibility');

            cy.wait('@toggleVisibility').its('response.statusCode').should('eq', 200);
        });
    });

    it('moves item to trash', () => {
        const itemId = 1;
        mountHook(() => useNavigationActions()).then((result) => {
            result.current?.moveItemToTrash(itemId);
            cy.intercept({ method: 'POST', url: `/api/styleguide-navigation-item/${itemId}/move-to-trash` }, {}).as(
                'moveToTrash',
            );

            cy.wait('@moveToTrash').its('response.statusCode').should('eq', 200);
        });
    });

    it('creates item', () => {
        const itemToCreate = {
            parentId: null,
            styleguideFolderId: 20,
            styleguideNavigationId: 2,
        };
        mountHook(() => useNavigationActions()).then((result) => {
            result.current?.createItem(itemToCreate);
            cy.intercept(
                { method: 'POST', url: '/api/styleguide-navigation-item' },
                {
                    body: {
                        itemToCreate,
                    },
                },
            ).as('createItem');

            cy.wait('@createItem').its('response.statusCode').should('eq', 200);
        });
    });

    it('duplicates item', () => {
        const itemId = 1;
        mountHook(() => useNavigationActions()).then((result) => {
            result.current?.duplicateItem(itemId);
            cy.intercept({ method: 'POST', url: `/api/styleguide-navigation-item/${itemId}/duplicate` }, {}).as(
                'duplicateItem',
            );

            cy.wait('@duplicateItem').its('response.statusCode').should('eq', 200);
        });
    });

    it('deletes item permanently', () => {
        const itemId = 1;
        mountHook(() => useNavigationActions()).then((result) => {
            result.current?.deleteItemPermanently(itemId);
            cy.intercept({ method: 'DELETE', url: `/api/styleguide-navigation-item/${itemId}` }, {}).as(
                'deletePermanently',
            );

            cy.wait('@deletePermanently').its('response.statusCode').should('eq', 200);
        });
    });

    it('restores item', () => {
        const itemId = 1;
        mountHook(() => useNavigationActions()).then((result) => {
            result.current?.restoreItem(itemId);
            cy.intercept(
                { method: 'POST', url: `/api/styleguide-navigation-item/${itemId}/restore-from-trash` },
                {},
            ).as('restoreItem');

            cy.wait('@restoreItem').its('response.statusCode').should('eq', 200);
        });
    });

    it('toggles folder dropdown', () => {
        const folderId = 1;
        const dropdown = true;
        mountHook(() => useNavigationActions()).then((result) => {
            result.current?.toggleFolderDropdown(folderId, dropdown);
            cy.intercept({ method: 'PATCH', url: `/api/styleguide-folder/${folderId}` }, {}).as('toggleFolderDropdown');

            cy.wait('@toggleFolderDropdown').its('response.statusCode').should('eq', 200);
        });
    });

    it('sorts items', () => {
        const itemId = 1;
        const parentId = 2;
        const positionBeforeId = 3;
        mountHook(() => useNavigationActions()).then((result) => {
            result.current?.sortItems(itemId, null, parentId, positionBeforeId);
            cy.intercept(
                { method: 'POST', url: `/api/styleguide-navigation-item/${itemId}/move` },
                {
                    body: {
                        target_styleguide_navigation_id: null,
                        target_parent_id: parentId,
                        position_before_id: positionBeforeId,
                    },
                },
            ).as('itemSort');

            cy.wait('@itemSort').its('response.statusCode').should('eq', 200);
        });
    });

    it('renames folder', () => {
        const item = { title: 'New folder' };
        const patchItem = {
            id: 1,
            creator: 10,
            created: '22/2/2022',
            modifier: null,
            modified: null,
            validTo: null,
            styleguideNavigationId: 1,
            parentId: null,
            sort: 1,
            published: true,
            styleguidePageId: null,
            styleguideFolderId: 15,
            styleguideLinkId: null,
            styleguideLibraryId: null,
            styleguideLibrary: null,
            styleguidePage: null,
            styleguideFolder: null,
            styleguideLink: null,
        };

        mountHook(() => useNavigationActions()).then((result) => {
            result.current?.renameItem(item.title, patchItem);
            cy.intercept(
                { method: 'PATCH', url: `/api/styleguide-folder/${patchItem.styleguideFolderId}` },
                {
                    body: {
                        item,
                    },
                },
            ).as('renameFolder');

            cy.wait('@renameFolder').its('response.statusCode').should('eq', 200);
        });
    });

    it('renames page', () => {
        const item = { title: 'New page' };
        const patchItem = {
            created: '2022-06-06T13:30:32.000+00:00',
            creator: 1,
            id: 5,
            modified: '2022-06-06T13:30:32.000+00:00',
            styleguideNavigationId: 1,
            modifier: 1,
            parentId: 3,
            published: false,
            sort: 2,
            styleguideFolder: null,
            styleguideFolderId: null,
            styleguideLibrary: null,
            styleguideLibraryId: null,
            styleguideLink: null,
            styleguideLinkId: null,
            styleguide_navigationId: 2,
            title: '',
            styleguidePage: {
                created: '2022-06-06T13:30:31.000+00:00',
                creator: 1,
                id: 2,
                modified: null,
                modifier: null,
                navigationTitle: '',
                styleguideNavigationId: 2,
                title: 'Promotion',
                validTo: null,
            },
            styleguidePageId: 2,
            validTo: null,
        };
        mountHook(() => useNavigationActions()).then((result) => {
            result.current?.renameItem(item.title, patchItem);
            cy.intercept(
                { method: 'PATCH', url: `/api/styleguide-page/${patchItem.styleguidePageId}` },
                {
                    body: {
                        item,
                    },
                },
            ).as('renamePge');

            cy.wait('@renamePge').its('response.statusCode').should('eq', 200);
        });
    });

    it('renames link', () => {
        const item = { open_in_new_tab: false, title: 'Some link1', url: 'https://www.sdf.df' };
        const patchItem = {
            created: '2022-06-08T14:54:27.000+00:00',
            creator: 1,
            id: 14,
            modified: '2022-06-09T07:52:09.000+00:00',
            modifier: 1,
            parentId: null,
            published: true,
            sort: 3,
            styleguideFolder: null,
            styleguideFolderId: null,
            styleguideLibrary: null,
            styleguideLibraryId: null,
            title: '',
            styleguideLink: {
                created: '2022-06-08T14:54:27.000+00:00',
                creator: 1,
                id: 1,
                modified: null,
                modifier: null,
                openInNewTab: false,
                styleguideNavigationId: 2,
                title: 'Some link',
                url: 'https://www.sdf.df',
                validTo: null,
            },
            styleguideLinkId: 1,
            styleguideNavigationId: 2,
            styleguidePage: null,
            styleguidePageId: null,
            validTo: null,
        };
        mountHook(() => useNavigationActions()).then((result) => {
            result.current?.renameItem(item.title, patchItem);
            cy.intercept(
                { method: 'PATCH', url: `/api/styleguide-link/${patchItem.styleguideLinkId}` },
                {
                    body: {
                        item,
                    },
                },
            ).as('renameLink');

            cy.wait('@renameLink').its('response.statusCode').should('eq', 200);
        });
    });
});
