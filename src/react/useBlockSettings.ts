import { useState } from "react";
import { AppBridgeNative } from "../AppBridgeNative";

export const useBlockSettings = <T = Record<string, unknown>>(
    appBridge: AppBridgeNative,
): [T, (newSettings: T) => void] => {
    const [blockSettings, setBlockSettings] = useState<T>({ ...(window.blockSettings[appBridge.blockId] as T) });

    if (!window.blockSettings[appBridge.blockId].__isProxy) {
        window.blockSettings[appBridge.blockId] = new Proxy(window.blockSettings[appBridge.blockId], {
            get: (_target: Record<string, unknown>, key: string) => {
                if (key === "__isProxy") {
                    return true;
                } else if (key) {
                    return blockSettings[key as keyof T];
                }
                return blockSettings;
            },
            set: (target: Record<string, unknown>, key: string, value: unknown) => {
                console.log("proxy set");

                target[key] = value;
                setBlockSettings({ ...(target as T) });
                return true;
            },
        });
    }

    const setBlockSettingsAndUpdate = async (newSettings: T): Promise<void> => {
        setBlockSettings(newSettings);
        await appBridge.updateBlockSettings<T>(window.blockSettings[appBridge.blockId] as T);
    };

    return [blockSettings, setBlockSettingsAndUpdate];
};
