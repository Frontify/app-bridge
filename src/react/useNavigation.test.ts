/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mountHook } from '@cypress/react';
import { useNavigation } from './useNavigation';

const STYLEGUIDE_NAVIGATION_ID = 1;

describe('useNavigation', () => {
    it('fetches the navigation', () => {
        const navigationResponse = {
            data: [
                {
                    id: 1,
                    creator: 9,
                    created: '2022-06-17T12:01:19.000+00:00',
                    styleguide_id: 1,
                    usage: 'MAIN',
                },
                {
                    id: 2,
                    creator: 9,
                    created: '2022-06-17T12:01:19.000+00:00',
                    styleguide_id: 1,
                    usage: 'FOOTER',
                },
                {
                    id: 3,
                    creator: 9,
                    created: '2022-06-17T12:01:19.000+00:00',
                    styleguide_id: 1,
                    usage: 'HIDDEN',
                },
                {
                    id: 4,
                    creator: 9,
                    created: '2022-06-17T12:01:19.000+00:00',
                    styleguide_id: 1,
                    usage: 'TRASH',
                },
            ],
        };

        const itemMainResponse = {
            data: [
                {
                    id: 1,
                    creator: 1,
                    created: '2022-05-12T08:20:25.000+00:00',
                    styleguide_navigation_id: 1,
                    parent_id: 141,
                    sort: 2,
                    published: true,
                    styleguide_page_id: null,
                    styleguide_library_id: null,
                    styleguide_folder_id: 36,
                    styleguide_link_id: null,
                    styleguide_page: null,
                    styleguide_library: null,
                    styleguide_folder: {
                        id: 36,
                        creator: 9,
                        created: '2022-05-12T08:20:25.000+00:00',
                        modifier: 9,
                        modified: '2022-05-12T08:20:25.000+00:00',
                        styleguide_navigation_id: 40,
                        title: 'folder',
                        dropdown: true,
                    },
                    styleguide_link: null,
                },
            ],
        };

        const itemFooterResponse = {
            data: {
                id: 144,
                creator: 9,
                created: '2022-06-30T12:47:44.000+00:00',
                modifier: 9,
                modified: '2022-07-01T10:04:50.000+00:00',
                styleguide_navigation_id: 40,
                parent_id: null,
                sort: 3,
                published: false,
                styleguide_page_id: 60,
                styleguide_library_id: null,
                styleguide_folder_id: null,
                styleguide_link_id: null,
                styleguide_page: {
                    id: 60,
                    creator: 9,
                    created: '2022-06-30T12:47:44.000+00:00',
                    styleguide_navigation_id: 40,
                    title: 'page for moving around',
                    navigation_title: '',
                },
                styleguide_library: null,
                styleguide_folder: null,
                styleguide_link: null,
            },
        };

        const itemUnlinkedResponse = {
            data: [],
        };

        const itemDeletedResponse = {
            data: [
                {
                    id: 142,
                    creator: 9,
                    created: '2022-06-30T08:38:11.000+00:00',
                    modifier: 9,
                    modified: '2022-06-30T12:47:34.000+00:00',
                    styleguide_navigation_id: 43,
                    parent_id: null,
                    sort: 1,
                    published: false,
                    styleguide_page_id: 58,
                    styleguide_library_id: null,
                    styleguide_folder_id: null,
                    styleguide_link_id: null,
                    styleguide_page: {
                        id: 58,
                        creator: 9,
                        created: '2022-06-30T08:38:11.000+00:00',
                        modifier: 9,
                        modified: '2022-06-30T12:47:34.000+00:00',
                        styleguide_navigation_id: 43,
                        title: 'test',
                        navigation_title: '',
                    },
                    styleguide_library: null,
                    styleguide_folder: null,
                    styleguide_link: null,
                },
            ],
        };

        const itemsMainId = 1;
        const itemsFooterId = 2;
        const itemsUnlinkedId = 3;
        const itemsDeletedId = 4;

        mountHook(() => useNavigation(STYLEGUIDE_NAVIGATION_ID)).then((result) => {
            result.current?.navigation;
            cy.intercept(
                { method: 'POST', url: `/api/styleguide/${STYLEGUIDE_NAVIGATION_ID}/navigation` },
                {
                    body: navigationResponse,
                },
            ).as('getNavigation');

            cy.intercept(
                { method: 'POST', url: `/api/styleguide-navigation/${itemsMainId}/item` },
                {
                    body: itemMainResponse,
                },
            ).as('getMainItems');

            cy.intercept(
                { method: 'POST', url: `/api/styleguide-navigation/${itemsFooterId}/item` },
                {
                    body: itemFooterResponse,
                },
            ).as('getFooterItems');

            cy.intercept(
                { method: 'POST', url: `/api/styleguide-navigation/${itemsUnlinkedId}/item` },
                {
                    body: itemUnlinkedResponse,
                },
            ).as('getUnlinkedItems');

            cy.intercept(
                { method: 'POST', url: `/api/styleguide-navigation/${itemsDeletedId}/item` },
                {
                    body: itemDeletedResponse,
                },
            ).as('getDeletedItems');

            cy.wait('@getNavigation').its('response.statusCode').should('eq', 200);
            cy.wait('@getMainItems').its('response.statusCode').should('eq', 200);
            cy.wait('@getFooterItems').its('response.statusCode').should('eq', 200);
            cy.wait('@getUnlinkedItems').its('response.statusCode').should('eq', 200);
            cy.wait('@getDeletedItems').its('response.statusCode').should('eq', 200);
        });
    });

    it('fetches the navigation ID', () => {
        mountHook(() => useNavigation(STYLEGUIDE_NAVIGATION_ID)).then((result) => {
            result.current?.getNavigationId('main');
        });
    });
});
