/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset, FileExtension, Template } from '.';

export enum TerrificEvent {
    OpenModal = 'onOpenModal',
    CloseModal = 'onCloseModal',
}

export type AssetChooserResult = { screenData: Asset[] };
export type TemplateChooserResult = { template: Template };

export type AssetChooserAssetChosenCallback = (assetChooserResult: AssetChooserResult) => void;
export type TemplateChooserTemplateChosenCallback = (templateChooserResult: TemplateChooserResult) => void;

export enum AssetChooserProjectType {
    MediaLibrary = 'MediaLibrary',
    LogoLibrary = 'LogoLibrary',
    IconLibrary = 'IconLibrary',
    DocumentLibrary = 'DocumentLibrary',
    TemplateLibrary = 'TemplateLibrary',
    PatternLibrary = 'PatternLibrary',
    Styleguide = 'Styleguide',
    Workspace = 'Workspace',
}

export enum AssetChooserObjectType {
    File = 'FILE', // Audio, Zip, ...
    Canvas = 'CANVAS',
    ImageVideo = 'IMAGE', // No distinction between images and videos in the screen table
    TextSnippet = 'TEXT_SNIPPET',
    Url = 'URL',
}

export type AssetChooserOptions = {
    selectedValueId?: number | string;
    projectTypes?: AssetChooserProjectType[];
    objectTypes?: AssetChooserObjectType[];
    multiSelection?: boolean;
    extensions?: FileExtension[];
};
