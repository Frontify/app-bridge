/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset, Color, ColorPalette, Template, User } from '../types';
import { IAppBridgeNative } from '../types/IAppBridgeNative';
import { AssetDummy } from './AssetDummy';
import { ColorPaletteDummy } from './ColorPaletteDummy';
import { UserDummy } from './UserDummy';

export class AppBridgeNativeDummy implements IAppBridgeNative {
    private readonly ASSET_ID_1 = 5934;
    private readonly ASSET_ID_2 = 324;
    private readonly PROJECT_ID = 421;
    private readonly USER_ID_1 = 234;

    constructor(public readonly blockId = 90539, public readonly sectionId = 2345) {}

    getAssetById(assetId: number): Promise<Asset> {
        return new Promise((resolve) => resolve(AssetDummy.with(assetId)));
    }

    getBlockAssets(): Promise<Record<string, Asset[]>> {
        return new Promise((resolve) =>
            resolve({
                images: [AssetDummy.with(this.ASSET_ID_1), AssetDummy.with(this.ASSET_ID_2)],
            }),
        );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async deleteAssetIdsFromBlockAssetKey(key: string, assetIds: number[]): Promise<void> {
        return new Promise((resolve) => resolve());
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async addAssetIdsToBlockAssetKey(key: string, assetIds: number[]): Promise<Asset[]> {
        return new Promise((resolve) => {
            resolve([AssetDummy.with(this.ASSET_ID_1)]);
        });
    }

    getBlockId(): number | undefined {
        return this.blockId;
    }

    getColorsByIds(): Promise<Color[]> {
        return new Promise((resolve) => resolve([]));
    }

    getAvailableColors(): Promise<Color[]> {
        return new Promise((resolve) => resolve([]));
    }

    getAvailablePalettes(): Promise<ColorPalette[]> {
        return new Promise((resolve) => resolve(ColorPaletteDummy.withDefaults()));
    }

    getBlockSettings<T = Record<string, unknown>>(): Promise<T> {
        return new Promise((resolve) => resolve({} as T));
    }

    updateBlockSettings(): Promise<void> {
        return new Promise((resolve) => resolve());
    }

    getEditorState(): boolean {
        return false;
    }

    getProjectId(): number {
        return this.PROJECT_ID;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    openAssetChooser(): void {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    closeAssetChooser(): void {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    openTemplateChooser(): void {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    closeTemplateChooser(): void {}

    getCurrentLoggedUser(): Promise<User> {
        return new Promise((resolve) => resolve(UserDummy.with(this.USER_ID_1)));
    }

    getTemplateById(): Promise<Template> {
        return new Promise((resolve) =>
            resolve({
                asset_created: 'asset_created',
                asset_modified: 'asset_modified',
                categories: [],
                description: 'description',
                height: 0,
                id: 1,
                name: 'name',
                preview: 'preview',
                project: 1,
                project_name: 'project_name',
                project_type: 'project_type',
                screen_id: 1,
                sector: 'sector',
                token: 'token',
                unit: 'unit',
                width: 0,
            }),
        );
    }
}
