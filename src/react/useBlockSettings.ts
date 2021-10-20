import { useState } from "react";
import { AppBridgeNative } from "../AppBridgeNative";

export const useBlockSettings = <T = Record<string, unknown>>(
    appBridge: AppBridgeNative,
): [T, (newSettings: T) => void] => {
    if (appBridge.blockId === undefined) {
        throw new Error("You need to instanciate the App Bridge with a block id.");
    }

    const [blockSettings, setBlockSettings] = useState<T>({ ...(window.blockSettings[appBridge.blockId] as T) });

    if (!window.blockSettings[appBridge.blockId].__isProxy) {
        window.blockSettings[appBridge.blockId] = new Proxy(window.blockSettings[appBridge.blockId], {
            get: (target: Record<string, unknown>, key: string) => {
                if (key === "__isProxy") {
                    return true;
                } else if (key) {
                    return target[key];
                }
                return target;
            },
            set: (target: Record<string, unknown>, key: string, value: unknown) => {
                target[key] = value;
                setBlockSettings({ ...blockSettings, [key]: value });
                return true;
            },
        });
    }

    const setBlockSettingsAndUpdate = async (newSettings: T): Promise<void> => {
        if (appBridge.blockId === undefined) {
            throw new Error("You need to instanciate the App Bridge with a block id.");
        }

        for (const settingsIndex in newSettings) {
            window.blockSettings[appBridge.blockId][settingsIndex] = newSettings[settingsIndex];
        }
        await appBridge.updateBlockSettings({ ...newSettings });
    };

    return [blockSettings, setBlockSettingsAndUpdate];
};
