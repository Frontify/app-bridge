/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mountHook } from '@cypress/react';
import { useNavigationManager } from './useNavigationManager';

describe('useNavigationManager', () => {
    before(() => {
        cy.window().then((windowObject) => {
            windowObject.emitter = {
                emit: () => null,
                off: () => null,
                on: () => null,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any;
        });
    });

    it('emits the OpenNavigationManager', () => {
        mountHook(() => useNavigationManager()).then((result) => {
            cy.stub(result.current?.openNavigationManager).as('openNavigationManagerStub');

            cy.get('@openNavigationManagerStub').should('be.called');
        });
    });
});
