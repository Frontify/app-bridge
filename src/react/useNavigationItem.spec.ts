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
    it('create a new folder', async () => {
        const pendingRequest = waitForRequest(server, 'POST', '/api/styleguide-folder');

        const { result } = renderHook(() => useNavigationItem());
        result.current.createFolder(STYLEGUIDE_FOLDER, 2);

        const request = await pendingRequest;

        expect(request).to.not.be.null;
    });
});
