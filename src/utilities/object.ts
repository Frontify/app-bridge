/* (c) Copyright Frontify Ltd., all rights reserved. */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const compareObjects = (obj1: any, obj2: any) => {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);

    if (obj1Keys.length !== obj2Keys.length) {
        return false;
    }

    for (const key of obj1Keys) {
        if (
            (typeof obj1[key] === 'object' && !compareObjects(obj1[key], obj2[key])) ||
            (typeof obj1[key] !== 'object' && obj1[key] !== obj2[key])
        ) {
            return false;
        }
    }

    return true;
};

export const isObject = (item: any) => {
    return item && typeof item === 'object' && !Array.isArray(item);
};

export const mergeDeep = <T = Record<string, unknown>>(target: any, ...sources: any): T => {
    if (sources.length === 0) {
        return target;
    }
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, { [key]: {} });
                }
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
};
