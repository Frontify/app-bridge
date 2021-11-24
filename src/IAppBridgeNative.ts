import { Asset, Color, ColorPalette, AssetChooserAssetChosenCallback, User } from "./types";

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
    openAssetChooser(callback: AssetChooserAssetChosenCallback): void;
    closeAssetChooser(): void;
    getCurrentLoggedUser(): Promise<User>;
}
