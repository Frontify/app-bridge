import { useEffect, useState } from "react";
import { IAppBridgeNative } from "../IAppBridgeNative";
import { AppBridgeNative } from "../AppBridgeNative";

export const useEditorState = (appBridge?: IAppBridgeNative): boolean => {
    const appBridgeInstance = appBridge ?? new AppBridgeNative(0, 0);
    const [editorState, setEditorState] = useState(appBridgeInstance.getEditorState());

    useEffect(() => {
        const setFromEvent = () => setEditorState(appBridgeInstance.getEditorState());

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
