import { useState, useEffect } from "react";
import AppBridge from "../AppBridgeNative";

const useEditorState = (): boolean => {
    const [editorState, setEditorState] = useState(AppBridge.context.getEditorState());

    useEffect(() => {
        const setFromEvent = () => setEditorState(AppBridge.context.getEditorState());

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

export default useEditorState;
