/* (c) Copyright Frontify Ltd., all rights reserved. */

export type Guideline = {
    id: number;
    creator: number;
    created: string;
    modifier?: number;
    modified?: string;
    validTo?: string;
    projectId: number;
    brandId: number;
    name: string;
    themeSettings?: string;
};

export type GuidelineNavigationItem = {
    id: number;
    creator: number;
    created: string;
    modifier: Nullable<number>;
    modified: Nullable<string>;
    validTo: Nullable<string>;
    styleguideNavigationId: number;
    parentId: Nullable<number>;
    sort: Nullable<number>;
    published: boolean;
    styleguidePageId: Nullable<number>;
    styleguideFolderId: Nullable<number>;
    styleguideLinkId: Nullable<number>;
    styleguideLibraryId: Nullable<number>;
    styleguideLibrary: Nullable<GuidelineLibrary>;
    styleguidePage: Nullable<GuidelinePage>;
    styleguideFolder: Nullable<GuidelineFolder>;
    styleguideLink: Nullable<GuidelineLink>;

    // Enriched
    dropdownItems?: GuidelineNavigationItem[];
};

export type GuidelinePage = {
    id: number;
    styleguideNavigationId: number;
    title: string;
    navigationTitle: Nullable<string>;
};
export type GuidelinePagePatch = Partial<GuidelinePage>;
export type GuidelinePageCreate = Omit<GuidelinePage, 'id'>;

export type GuidelineFolder = {
    id: number;
    styleguideNavigationId: number;
    title: string;
    dropdown: boolean;
};
export type GuidelineFolderPatch = Partial<GuidelineFolder>;
export type GuidelineFolderCreate = Omit<GuidelineFolder, 'id'>;

export type GuidelineLink = {
    id: number;
    styleguideNavigationId: number;
    title: string;
    url: string;
    openInNewTab: boolean;
};
export type GuidelineLinkPatch = Partial<GuidelineLink>;
export type GuidelineLinkCreate = Omit<GuidelineLink, 'id'>;

export type GuidelineLibrary = {
    id: number;
    styleguideNavigationId: number;
    title: string;
    // TODO: add missing fields if any are missing
};
export type GuidelineLibraryPatch = Partial<GuidelineLibrary>;
export type GuidelineLibraryCreate = Omit<GuidelineLibrary, 'id'>;

export type GuidelineNavigationUsageType = 'main' | 'footer' | 'hidden' | 'trash';

export type GuidelineNavigation = {
    id: number;
    creator: number;
    created: string;
    modifier: Nullable<number>;
    modified: Nullable<string>;
    validTo: Nullable<string>;
    projectId: number;
    styleguideId: number;
    usage: GuidelineNavigationUsageType;
};

export type GuidelineNavigationItemCreate = Partial<GuidelineNavigationItem>;
export type GuidelineNavigationItemPatch = Partial<GuidelineNavigationItem>;

export type GuidelineNavigationArea = 'main' | 'footer' | 'trash' | 'hidden';
export type GuidelineNavigations = Record<GuidelineNavigationArea, GuidelineNavigationItem[]>;
export type GuidelineNavigationsId = Record<GuidelineNavigationArea, Nullable<number>>;
