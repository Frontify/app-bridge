import { useState } from "react";
import { AppBridgeNative } from "../AppBridgeNative";

export type Immutable<T> = {
    readonly [K in keyof T]: Immutable<T[K]>;
};

export const useBlockSettings = <T = Record<string, unknown>>(
    appBridge: AppBridgeNative,
): [Immutable<T>, (newSettings: T) => void] => {
    if (appBridge.blockId === undefined) {
        throw new Error("You need to instanciate the App Bridge with a block id.");
    }

    if (!window.blockSettings[appBridge.blockId].__isProxy) {
        window.blockSettings[appBridge.blockId] = new Proxy(window.blockSettings[appBridge.blockId], {
            get: (target: Record<string, unknown>, property: string, received: unknown) => {
                if (property === "__isProxy") {
                    return true;
                }
                return Reflect.get(target, property, received);
            },
            set: (target: Record<string, unknown>, property: string, value: unknown) => {
                setBlockSettings({ ...(target as T), [property]: value });
                target[property] = value;
                return true;
            },
        });
    }

    const [blockSettings, setBlockSettings] = useState<T>(window.blockSettings[appBridge.blockId] as T);

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
