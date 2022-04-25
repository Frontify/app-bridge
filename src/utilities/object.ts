// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const compareObjects = (obj1: any, obj2: any) => {
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);

    if (obj1Keys.length !== obj2Keys.length) {
        return false;
    }

    for (const key of obj1Keys) {
        if (typeof obj1[key] === 'object') {
            if (!compareObjects(obj1[key], obj2[key])) {
                return false;
            }
        } else {
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }
    }

    return true;
};
