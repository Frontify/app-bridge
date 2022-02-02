/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IAppBridgeNative } from "./IAppBridgeNative";
import { Asset, Color, ColorPalette, User } from "./types";

export class AppBridgeNativeMock implements IAppBridgeNative {
    getAssets(): Promise<void> {
        return Promise.resolve(undefined);
    }
    setAssets(settingName: string, assets: number[]): Promise<void> {
        return Promise.resolve(undefined);
    }
    constructor(public blockId?: number, public sectionId?: number) {}

    getAssetById(assetId: number): Promise<Asset> {
        return new Promise((resolve) =>
            resolve({
                id: assetId,
                creator_name: "creataorr",
                ext: "ext",
                file_id: "file_id",
                generic_url: "generic_url",
                preview_url: "preview_url",
                height: null,
                object_type: "object_type",
                project_id: this.getProjectId(),
                revision: 1,
                revision_id: 1,
                width: null,
            }),
        );
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
                name: "name",
                email: "email",
                preview_url_without_placeholder: "preview_url_without_placeholder",
                gravatar_hash: "gravatar_hash",
                image: {
                    image: "image",
                    original: "original",
                    x: "x",
                    y: "y",
                    width: "width",
                    height: "height",
                },
                original: "original",
                created: "created",
                created_localized: "created_localized",
                role: null,
                language: "language",
                localization_options: [],
                timezone: "timezone",
                signup_mode: "signup_mode",
                organization: "organization",
                two_factor_forced: false,
                success: true,
            }),
        );
    }
}
