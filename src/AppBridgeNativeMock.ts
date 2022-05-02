/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IAppBridgeNative } from './IAppBridgeNative';
import { Asset, Color, ColorPalette, Template, User } from './types';

export class AppBridgeNativeMock implements IAppBridgeNative {
    constructor(public blockId?: number, public sectionId?: number) {}

    getAssetById(assetId: number): Promise<Asset> {
        return new Promise((resolve) =>
            resolve({
                id: assetId,
                creator_name: 'creataorr',
                ext: 'ext',
                file_id: 'an_random_file_id',
                generic_url: 'generic_url',
                origin_url: 'origin_url',
                preview_url: 'preview_url',
                height: null,
                object_type: 'object_type',
                project_id: this.getProjectId(),
                width: null,
            }),
        );
    }

    getBlockAssets(): Promise<Record<string, Asset[]>> {
        return new Promise((resolve) =>
            resolve({
                images: [
                    {
                        creator_name: 'creataorr',
                        ext: 'png',
                        file_id: 'an_random_file_id_1',
                        filename: 'file 1',
                        height: 3450,
                        id: 534,
                        object_type: 'ASSET',
                        generic_url: 'generic_url_1',
                        origin_url: 'origin_url_1',
                        preview_url: 'preview_url_1',
                        project_id: this.getProjectId(),
                        width: 3542,
                    },
                    {
                        creator_name: 'creataorr',
                        ext: 'jpg',
                        file_id: 'an_random_file_id_2',
                        filename: 'file 2',
                        height: 3213,
                        id: 567,
                        object_type: 'ASSET',
                        generic_url: 'generic_url_2',
                        origin_url: 'origin_url_2',
                        preview_url: 'preview_url_2',
                        project_id: this.getProjectId(),
                        width: 965,
                    },
                ],
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
            resolve([
                {
                    creator_name: 'creataorr',
                    ext: 'jpg',
                    file_id: 'an_random_file_id_2',
                    filename: 'file 2',
                    height: 3213,
                    id: 567,
                    object_type: 'ASSET',
                    generic_url: 'generic_url_2',
                    origin_url: 'origin_url_2',
                    preview_url: 'preview_url_2',
                    project_id: this.getProjectId(),
                    width: 965,
                },
            ]);
        });
    }

    getBlockId(): number | undefined {
        return 9345;
    }

    getColorsByIds(): Promise<Color[]> {
        return new Promise((resolve) => resolve([]));
    }

    getAvailableColors(): Promise<Color[]> {
        return new Promise((resolve) => resolve([]));
    }

    getAvailablePalettes(): Promise<ColorPalette[]> {
        return new Promise((resolve) => resolve([]));
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
        return 1;
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
        return new Promise((resolve) =>
            resolve({
                id: 1,
                account_id: 1,
                name: 'name',
                email: 'email',
                preview_url_without_placeholder: 'preview_url_without_placeholder',
                gravatar_hash: 'gravatar_hash',
                image: {
                    image: 'image',
                    original: 'original',
                    x: 'x',
                    y: 'y',
                    width: 'width',
                    height: 'height',
                },
                original: 'original',
                created: 'created',
                created_localized: 'created_localized',
                role: null,
                language: 'language',
                localization_options: [],
                timezone: 'timezone',
                signup_mode: 'signup_mode',
                organization: 'organization',
                two_factor_forced: false,
                success: true,
            }),
        );
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
