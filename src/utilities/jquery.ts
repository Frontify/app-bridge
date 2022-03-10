export const getJqueryDataByElement = (element: Element): Record<string, unknown> => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return Object.keys(element).reduce((stack, key) => ({ ...stack, ...element[key] }), {});
};

export const getJqueryDatasetByClassName = (className: string): Record<string, unknown> => {
    const element = document.getElementsByClassName(className)[0];
    if (!element) {
        throw new Error('Could not find the DOM node via class name');
    }

    return getJqueryDataByElement(element);
};
