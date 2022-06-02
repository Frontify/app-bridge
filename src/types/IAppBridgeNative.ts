/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Asset,
    AssetChooserAssetChosenCallback,
    AssetChooserOptions,
    Color,
    ColorPalette,
    Template,
    TemplateChooserTemplateChosenCallback,
    User,
} from '.';

export interface IAppBridgeNative {
    blockId?: number;
    sectionId?: number;
    getBlockId(): number | undefined;
    getAssetById(assetId: number): Promise<Asset>;
    getBlockAssets(): Promise<Record<string, Asset[]>>;
    addAssetIdsToBlockAssetKey(key: string, assetIds: number[]): Promise<Asset[]>;
    deleteAssetIdsFromBlockAssetKey(key: string, assetIds: number[]): Promise<void>;
    getTemplateById(templateId: number): Promise<Template>;
    getColorsByIds(colorIds: number[]): Promise<Color[]>;
    getAvailableColors(): Promise<Color[]>;
    getAvailablePalettes(): Promise<ColorPalette[]>;
    getBlockSettings<T = Record<string, unknown>>(): Promise<T>;
    updateBlockSettings<T = Record<string, unknown>>(newSettings: T): Promise<void>;
    getEditorState(): boolean;
    isReferencedBlock(): boolean;
    getProjectId(): number;
    openAssetChooser(callback: AssetChooserAssetChosenCallback, options?: AssetChooserOptions): void;
    closeAssetChooser(): void;
    openTemplateChooser(callback: TemplateChooserTemplateChosenCallback): void;
    closeTemplateChooser(): void;
    getCurrentLoggedUser(): Promise<User>;
}
