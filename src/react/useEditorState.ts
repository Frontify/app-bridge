/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useState } from 'react';
import { IAppBridgeNative } from '../types/IAppBridgeNative';
import { AppBridgeNative } from '../AppBridgeNative';

export const useEditorState = (appBridge?: IAppBridgeNative): boolean => {
    const appBridgeInstance = appBridge ?? new AppBridgeNative(0, 0);
    const [editorState, setEditorState] = useState(appBridgeInstance.getEditorState());

    useEffect(() => {
        const setFromEvent = () => setEditorState(appBridgeInstance.getEditorState());

        const mutationObserver = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.attributeName === 'class') {
                    setFromEvent();
                }
            }
        });

        const editButtonElement = document.querySelector('.js-co-powerbar__sg-edit');
        if (!editButtonElement) {
            console.error('Can not find the editing state');
            return;
        }

        mutationObserver.observe(editButtonElement, { attributes: true });

        return () => {
            mutationObserver.disconnect();
        };
    }, []);

    return editorState;
};
