import { useState, useEffect } from "react";
import { AppBridgeNative } from "../AppBridgeNative";

export const useBlockSettings = <T = Record<string, unknown>>(
    appBridge: AppBridgeNative,
): [T, (newSettings: T) => Promise<void>] => {
    const [blockSettings, setBlockSettings] = useState<T>({} as T);

    useEffect(() => {
        (async () => {
            setBlockSettings(await appBridge.getBlockSettings());
        })();
    }, []);

    const setBlockSettingsAndUpdate = async (newSettings: T) => {
        await appBridge.updateBlockSettings<T>(newSettings);
        setBlockSettings(newSettings);
    };

    return [blockSettings, setBlockSettingsAndUpdate];
};
