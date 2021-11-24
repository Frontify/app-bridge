import { IAppBridgeNative } from "./IAppBridgeNative";
import { Asset, Color, ColorPalette, User } from "./types";

export class AppBridgeNativeMock implements IAppBridgeNative {
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
                    image: "https://images.frontify.test/local/clarify/eyJwYXRoIjoiXC9wdWJsaWNcL3VwbG9hZFwvYXZhdGFyXC9jNFwvODkyZWViNjAzMzAxZTBjNjA0MDkxOThlNzlkMGVkOWUtMTU5NzM5NzY1OS5wbmcifQ:clarify:_LinHPsAO4qhk0T0nk8cLSo_JOA1Brh-3kScxIdZ6uk?width=400&rect=0,0,800,800&reference_width=800",
                    original:
                        "https://images.frontify.test/local/clarify/eyJwYXRoIjoiXC9wdWJsaWNcL3VwbG9hZFwvYXZhdGFyXC9jNFwvODkyZWViNjAzMzAxZTBjNjA0MDkxOThlNzlkMGVkOWUtMTU5NzM5NzY1OS5wbmcifQ:clarify:_LinHPsAO4qhk0T0nk8cLSo_JOA1Brh-3kScxIdZ6uk?width={width}",
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
