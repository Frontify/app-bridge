/* (c) Copyright Frontify Ltd., all rights reserved. */

export type Styleguide = {
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

export type StyleguideNavigationItem = {
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
    styleguideLibrary: Nullable<StyleguideLibrary>;
    styleguidePage: Nullable<StyleguidePage>;
    styleguideFolder: Nullable<StyleguideFolder>;
    styleguideLink: Nullable<StyleguideLink>;

    // Enriched
    dropdownItems?: StyleguideNavigationItem[];
};

export type StyleguidePage = {
    id: number;
    styleguideNavigationId: number;
    title: string;
    navigationTitle: Nullable<string>;
};
export type StyleguidePagePatch = Partial<StyleguidePage>;
export type StyleguidePageCreate = Omit<StyleguidePage, 'id'>;

export type StyleguideFolder = {
    id: number;
    styleguideNavigationId: number;
    title: string;
    dropdown: boolean;
};
export type StyleguideFolderPatch = Partial<StyleguideFolder>;
export type StyleguideFolderCreate = Omit<StyleguideFolder, 'id'>;

export type StyleguideLink = {
    id: number;
    styleguideNavigationId: number;
    title: string;
    url: string;
    openInNewTab: boolean;
};
export type StyleguideLinkPatch = Partial<StyleguideLink>;
export type StyleguideLinkCreate = Omit<StyleguideLink, 'id'>;

export type StyleguideLibrary = {
    id: number;
    styleguideNavigationId: number;
    title: string;
    //TODO: add missing fields if any are missing
};
export type StyleguideLibraryPatch = Partial<StyleguideLibrary>;
export type StyleguideLibraryCreate = Omit<StyleguideLibrary, 'id'>;

export type StyleguideNavigationUsageType = 'main' | 'footer' | 'hidden' | 'trash';

export type StyleguideNavigation = {
    id: number;
    creator: number;
    created: string;
    modifier: Nullable<number>;
    modified: Nullable<string>;
    validTo: Nullable<string>;
    projectId: number;
    styleguideId: number;
    usage: StyleguideNavigationUsageType;
};

export type StyleguideNavigationItemCreate = Partial<StyleguideNavigationItem>;
export type StyleguideNavigationItemPatch = Partial<StyleguideNavigationItem>;
