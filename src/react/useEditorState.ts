import { useState, useEffect } from "react";
import { AppBridgeNative } from "../AppBridgeNative";

export const useEditorState = (): boolean => {
    const appBridge = new AppBridgeNative(0, 0);
    const [editorState, setEditorState] = useState(appBridge.getEditorState());

    useEffect(() => {
        const setFromEvent = () => setEditorState(appBridge.getEditorState());

        const mutationObserver = new MutationObserver((mutationsList) => {
            mutationsList.forEach((mutation) => {
                if (mutation.attributeName === "class") {
                    setFromEvent();
                }
            });
        });

        mutationObserver.observe(document.body, { attributes: true });

        return () => {
            mutationObserver.disconnect();
        };
    }, []);

    return editorState;
};
