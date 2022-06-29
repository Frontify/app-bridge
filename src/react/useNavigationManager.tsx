/* (c) Copyright Frontify Ltd., all rights reserved. */

export const useNavigationManager = () => {
    const openNavigationManager = () => {
        window.emitter.emit('OpenNavigationManager');
    };

    return {
        openNavigationManager,
    };
};
