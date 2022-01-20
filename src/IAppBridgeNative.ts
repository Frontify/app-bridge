/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Asset,
    Color,
    ColorPalette,
    AssetChooserAssetChosenCallback,
    User,
    TemplateChooserTemplateChosenCallback,
    AssetChooserOptions,
} from "./types";

export interface IAppBridgeNative {
    blockId?: number;
    sectionId?: number;
    getAssetById(assetId: number): Promise<Asset>;
    getColorsByIds(colorIds: number[]): Promise<Color[]>;
    getAvailableColors(): Promise<Color[]>;
    getAvailablePalettes(): Promise<ColorPalette[]>;
    getBlockSettings<T = Record<string, unknown>>(): Promise<T>;
    updateBlockSettings<T = Record<string, unknown>>(newSettings: T): Promise<void>;
    getEditorState(): boolean;
    getProjectId(): number;
    openAssetChooser(callback: AssetChooserAssetChosenCallback, options?: AssetChooserOptions): void;
    closeAssetChooser(): void;
    openTemplateChooser(callback: TemplateChooserTemplateChosenCallback): void;
    closeTemplateChooser(): void;
    getCurrentLoggedUser(): Promise<User>;
}
