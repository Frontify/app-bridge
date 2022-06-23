/* (c) Copyright Frontify Ltd., all rights reserved. */

import { RefCallback, useCallback, useEffect, useRef, useState } from 'react';

export const useReadyForPrint = <T extends HTMLElement>(): {
    containerRef: RefCallback<T>;
    isReadyForPrint: boolean;
    setIsReadyForPrint: (isReady: boolean) => void;
} => {
    const [ready, setReady] = useState<boolean>(false);
    const elementRef = useRef<T | null>(null);

    const getBlockWrapper = () => {
        if (!elementRef || !elementRef.current) {
            return null;
        }
        return elementRef.current.closest('.mod.block:not(.mod-block-section)');
    };

    useEffect(() => {
        const blockWrapper = getBlockWrapper();

        if (!blockWrapper) {
            return;
        }

        setReady(blockWrapper.getAttribute('data-ready') === 'true');
    }, []);

    const setIsReadyForPrint = (isReady: boolean) => {
        const blockWrapper = getBlockWrapper();

        if (!blockWrapper) {
            return;
        }

        blockWrapper.setAttribute('data-ready', isReady.toString());
        setReady(isReady);
    };

    const assignRef = useCallback((node: T | null) => {
        elementRef.current = node;
    }, []);

    return { containerRef: assignRef, isReadyForPrint: ready, setIsReadyForPrint };
};
