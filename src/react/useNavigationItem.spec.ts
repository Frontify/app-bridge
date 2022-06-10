/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useNavigationItem } from './useNavigationItem';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import { waitForRequest } from '../tests/waitForRequest';

const STYLEGUIDE_FOLDER = {
    dropdown: false,
    styleguideNavigationId: 2,
    title: 'Some Title',
};

const CREATE_STYLEGUIDE_FOLDER_RESPONSE = {
    data: {
        created: '2022-06-08T13:14:47.000+00:00',
        creator: 234,
        dropdown: false,
        id: 18,
        modified: null,
        modifier: null,
        styleguide_navigation_id: 2,
        title: 'Some title',
        valid_to: null,
    },
};

const STYLEGUIDE_PAGE = {
    navigation_title: 'Some title',
    styleguide_navigation_id: 2,
    title: 'Some page',
};

const CREATE_STYLEGUIDE_PAGE_RESPONSE = {
    data: {
        created: '2022-06-08T13:14:47.000+00:00',
        creator: 1,
        dropdown: false,
        id: 18,
        modified: null,
        modifier: null,
        styleguide_navigation_id: 2,
        title: 'Some page',
        valid_to: null,
    },
};

const STYLEGUIDE_LINK = {
    open_in_new_tab: false,
    styleguide_navigation_id: 2,
    title: 'Some link',
    url: 'https://www.link.com',
};

const CREATE_STYLEGUIDE_LINK_RESPONSE = {
    data: {
        created: '2022-06-08T14:54:27.000+00:00',
        creator: 2345,
        id: 9,
        modified: null,
        modifier: null,
        open_in_new_tab: false,
        styleguide_navigation_id: 2,
        title: 'Some link',
        url: 'https://www.sdf.df',
        valid_to: null,
    },
};

const ITEM_ID = 3452;

const restHandlers = [
    rest.post('/api/styleguide-folder', (_req, res, ctx) =>
        res(ctx.status(200), ctx.json(CREATE_STYLEGUIDE_FOLDER_RESPONSE)),
    ),
    rest.post('/api/styleguide-navigation-item', (_req, res, ctx) =>
        res(ctx.status(200), ctx.json({ body: { success: true } })),
    ),
    rest.get('*', (_req, res, ctx) => {
        return res(ctx.status(400));
    }),
    rest.post('*', (_req, res, ctx) => {
        return res(ctx.status(400));
    }),
];

const server = setupServer(...restHandlers);

describe('useNavigationItem', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    /**
     * @vitest-environment happy-dom
     */
    it.only('adds new folder', async () => {
        const pendingRequest = waitForRequest(server, 'POST', '/api/styleguide-folder');

        const { result } = renderHook(() => useNavigationItem());
        result.current.addFolderAction(STYLEGUIDE_FOLDER, 2);

        const request = await pendingRequest;

        expect(request).to.not.be.null;
    });

    // it('adds new page', () => {
    //     mountHook(() => useNavigationItem()).then((result) => {
    //         result.current?.addPageAction(STYLEGUIDE_PAGE, 1);
    //         cy.intercept(
    //             { method: 'POST', url: '/api/styleguide-page' },
    //             {
    //                 body: CREATE_STYLEGUIDE_PAGE_RESPONSE,
    //             },
    //         ).as('createNewPage');

    //         cy.intercept(
    //             { method: 'POST', url: '/api/styleguide-navigation-item' },
    //             {
    //                 body: { success: true },
    //             },
    //         ).as('createNewItem');
    //         cy.wait('@createNewPage').its('response.statusCode').should('eq', 200);
    //         cy.wait('@createNewItem').its('response.statusCode').should('eq', 200);
    //     });
    // });

    // it('adds new link', () => {
    //     mountHook(() => useNavigationItem()).then((result) => {
    //         result.current?.addLinkAction(STYLEGUIDE_LINK, 1);
    //         cy.intercept(
    //             { method: 'POST', url: '/api/styleguide-link' },
    //             {
    //                 body: createLinkRepsonse,
    //             },
    //         ).as('createNewLink');

    //         cy.intercept(
    //             { method: 'POST', url: '/api/styleguide-navigation-item' },
    //             {
    //                 body: { success: true },
    //             },
    //         ).as('createNewItem');
    //         cy.wait('@createNewLink').its('response.statusCode').should('eq', 200);
    //         cy.wait('@createNewItem').its('response.statusCode').should('eq', 200);
    //     });
    // });

    // it('moves item', () => {
    //     const itemId = 1;
    //     const targetStyleguideNavigationId = 2;
    //     const parentId = '3';

    //     mountHook(() => useNavigationItem()).then((result) => {
    //         result.current?.moveItem(itemId, targetStyleguideNavigationId, parentId);
    //         cy.intercept(
    //             { method: 'POST', url: `/api/styleguide-navigation-item/${itemId}/move` },
    //             {
    //                 body: {
    //                     target_styleguide_navigation_id: targetStyleguideNavigationId,
    //                 },
    //             },
    //         ).as('moveItem');

    //         cy.wait('@moveItem').its('response.statusCode').should('eq', 200);
    //     });
    // });

    // it('toggles visibility', () => {
    //     const itemId = 1;
    //     const published = true;
    //     mountHook(() => useNavigationItem()).then((result) => {
    //         result.current?.toggleItemVisibility(itemId, published);
    //         cy.intercept(
    //             { method: 'PATCH', url: `/api/styleguide-navigation-item/${itemId}` },
    //             {
    //                 body: {
    //                     published,
    //                 },
    //             },
    //         ).as('toggleVisibility');

    //         cy.wait('@toggleVisibility').its('response.statusCode').should('eq', 200);
    //     });
    // });

    // it('moves item to trash', () => {
    //     const itemId = 1;
    //     mountHook(() => useNavigationItem()).then((result) => {
    //         result.current?.moveItemToTrash(itemId);
    //         cy.intercept({ method: 'POST', url: `/api/styleguide-navigation-item/${itemId}/move-to-trash` }, {}).as(
    //             'moveToTrash',
    //         );

    //         cy.wait('@moveToTrash').its('response.statusCode').should('eq', 200);
    //     });
    // });

    // it('creates item', () => {
    //     const itemToCreate = {
    //         parent_id: null,
    //         styleguide_folder_id: 20,
    //         styleguide_navigation_id: 2,
    //     };
    //     mountHook(() => useNavigationItem()).then((result) => {
    //         result.current?.createItem(itemToCreate);
    //         cy.intercept(
    //             { method: 'POST', url: '/api/styleguide-navigation-item' },
    //             {
    //                 body: {
    //                     itemToCreate,
    //                 },
    //             },
    //         ).as('createItem');

    //         cy.wait('@createItem').its('response.statusCode').should('eq', 200);
    //     });
    // });

    // it('duplicates item', () => {
    //     const itemId = 1;
    //     mountHook(() => useNavigationItem()).then((result) => {
    //         result.current?.duplicateItem(itemId);
    //         cy.intercept({ method: 'POST', url: `/api/styleguide-navigation-item/${itemId}/duplicate` }, {}).as(
    //             'duplicateItem',
    //         );

    //         cy.wait('@duplicateItem').its('response.statusCode').should('eq', 200);
    //     });
    // });

    // it('deletes item permanently', () => {
    //     const itemId = 1;
    //     mountHook(() => useNavigationItem()).then((result) => {
    //         result.current?.deleteItemPermanently(itemId);
    //         cy.intercept({ method: 'DELETE', url: `/api/styleguide-navigation-item/${itemId}` }, {}).as(
    //             'deletePermanently',
    //         );

    //         cy.wait('@deletePermanently').its('response.statusCode').should('eq', 200);
    //     });
    // });

    // it('restores item', () => {
    //     const itemId = 1;
    //     mountHook(() => useNavigationItem()).then((result) => {
    //         result.current?.restoreItem(itemId);
    //         cy.intercept(
    //             { method: 'POST', url: `/api/styleguide-navigation-item/${itemId}/restore-from-trash` },
    //             {},
    //         ).as('restoreItem');

    //         cy.wait('@restoreItem').its('response.statusCode').should('eq', 200);
    //     });
    // });

    // it('toggles folder dropdown', () => {
    //     const folderId = 1;
    //     const dropdown = true;
    //     mountHook(() => useNavigationItem()).then((result) => {
    //         result.current?.toggleFolderDropdown(folderId, dropdown);
    //         cy.intercept({ method: 'PATCH', url: `/api/styleguide-folder/${folderId}` }, {}).as('toggleFolderDropdown');

    //         cy.wait('@toggleFolderDropdown').its('response.statusCode').should('eq', 200);
    //     });
    // });

    // it('sorts items', () => {
    //     const itemId = 1;
    //     const parentId = '2';
    //     const positionBeforeId = '3';
    //     mountHook(() => useNavigationItem()).then((result) => {
    //         result.current?.sortItems(itemId, parentId, positionBeforeId);
    //         cy.intercept(
    //             { method: 'POST', url: `/api/styleguide-navigation-item/${itemId}/move` },
    //             {
    //                 body: {
    //                     target_styleguide_navigation_id: null,
    //                     target_parent_id: parentId,
    //                     position_before_id: positionBeforeId,
    //                 },
    //             },
    //         ).as('itemSort');

    //         cy.wait('@itemSort').its('response.statusCode').should('eq', 200);
    //     });
    // });

    // it('renames folder', () => {
    //     const item = { title: 'New folder' };
    //     const patchItem = {
    //         actions: [],
    //         badge: undefined,
    //         dropdown: false,
    //         editable: true,
    //         id: '1',
    //         name: 'About Monobrand',
    //         parentId: null,
    //         published: true,
    //         sort: 1,
    //         styleguide_folder_id: 15,
    //         styleguide_library_id: null,
    //         styleguide_link_id: null,
    //         styleguide_page_id: null,
    //         uri: null,
    //         value: 'About Monobrand',
    //     };
    //     mountHook(() => useNavigationItem()).then((result) => {
    //         result.current?.renameItem(item, patchItem);
    //         cy.intercept(
    //             { method: 'PATCH', url: `/api/styleguide-folder/${patchItem.styleguide_folder_id}` },
    //             {
    //                 body: {
    //                     item,
    //                 },
    //             },
    //         ).as('renameFolder');

    //         cy.wait('@renameFolder').its('response.statusCode').should('eq', 200);
    //     });
    // });

    // it('renames page', () => {
    //     const item = { title: 'New page' };
    //     const patchItem = {
    //         created: '2022-06-06T13:30:32.000+00:00',
    //         creator: 1,
    //         id: 5,
    //         modified: '2022-06-06T13:30:32.000+00:00',
    //         modifier: 1,
    //         parent_id: 3,
    //         published: false,
    //         sort: 2,
    //         styleguide_folder: null,
    //         styleguide_folder_id: null,
    //         styleguide_library: null,
    //         styleguide_library_id: null,
    //         styleguide_link: null,
    //         styleguide_link_id: null,
    //         styleguide_navigation_id: 2,
    //         title: '',
    //         styleguide_page: {
    //             created: '2022-06-06T13:30:31.000+00:00',
    //             creator: 1,
    //             id: 2,
    //             modified: null,
    //             modifier: null,
    //             navigation_title: '',
    //             styleguide_navigation_id: 2,
    //             title: 'Promotion',
    //             valid_to: null,
    //         },
    //         styleguide_page_id: 2,
    //         valid_to: null,
    //     };
    //     mountHook(() => useNavigationItem()).then((result) => {
    //         result.current?.renameItem(item, patchItem);
    //         cy.intercept(
    //             { method: 'PATCH', url: `/api/styleguide-page/${patchItem.styleguide_page_id}` },
    //             {
    //                 body: {
    //                     item,
    //                 },
    //             },
    //         ).as('renamePge');

    //         cy.wait('@renamePge').its('response.statusCode').should('eq', 200);
    //     });
    // });

    // it('renames link', () => {
    //     const item = { open_in_new_tab: false, title: 'Some link1', url: 'https://www.sdf.df' };
    //     const patchItem = {
    //         created: '2022-06-08T14:54:27.000+00:00',
    //         creator: 1,
    //         id: 14,
    //         modified: '2022-06-09T07:52:09.000+00:00',
    //         modifier: 1,
    //         parent_id: null,
    //         published: true,
    //         sort: 3,
    //         styleguide_folder: null,
    //         styleguide_folder_id: null,
    //         styleguide_library: null,
    //         styleguide_library_id: null,
    //         title: '',
    //         styleguide_link: {
    //             created: '2022-06-08T14:54:27.000+00:00',
    //             creator: 1,
    //             id: 1,
    //             modified: null,
    //             modifier: null,
    //             open_in_new_tab: false,
    //             styleguide_navigation_id: 2,
    //             title: 'Some link',
    //             url: 'https://www.sdf.df',
    //             valid_to: null,
    //         },
    //         styleguide_link_id: 1,
    //         styleguide_navigation_id: 2,
    //         styleguide_page: null,
    //         styleguide_page_id: null,
    //         valid_to: null,
    //     };
    //     mountHook(() => useNavigationItem()).then((result) => {
    //         result.current?.renameItem(item, patchItem);
    //         cy.intercept(
    //             { method: 'PATCH', url: `/api/styleguide-link/${patchItem.styleguide_link_id}` },
    //             {
    //                 body: {
    //                     item,
    //                 },
    //             },
    //         ).as('renameLink');

    //         cy.wait('@renameLink').its('response.statusCode').should('eq', 200);
    //     });
    // });
});
