/* (c) Copyright Frontify Ltd., all rights reserved. */

import { MutableRefObject, useEffect, useRef, useState } from 'react';

export const useReadyForPrint = <T extends HTMLElement>(): {
    containerRef: MutableRefObject<T | null>;
    isReadyForPrint: boolean;
    setIsReadyForPrint: (isReady: boolean) => void;
} => {
    const [ready, setReady] = useState<boolean>(false);
    const containerRef = useRef<T | null>(null);

    const getBlockWrapper = () => {
        if (!containerRef || !containerRef.current) {
            return null;
        }
        return containerRef.current.closest('.mod.block:not(.mod-block-section)');
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

    return { containerRef, isReadyForPrint: ready, setIsReadyForPrint };
};
