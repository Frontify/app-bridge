import { Asset, Color, ColorPalette, AssetChooserAssetChosenCallback, TerrificEvent, User } from "./types";
import { getJqueryDataByElement, getJqueryDatasetByClassName } from "./utilities/jquery";

export class AppBridgeNative {
    constructor(public blockId?: number, public sectionId?: number) {
        this.registerAppBridgeSubscriberInTerrificContext();
    }

    private registerAppBridgeSubscriberInTerrificContext() {
        if (!window.application.connectors.events.components.appBridge) {
            window.application.connectors.events.registerComponent({ id: "appBridge" });
        }
    }

    public async getAssetById(assetId: number): Promise<Asset> {
        const projectId = window.application.sandbox.config.context.project.id;
        const response = await window.fetch(`/api/screen/styleguide/${assetId}${projectId ? `/${projectId}` : ""}`, {
            method: "GET",
            headers: {
                "x-csrf-token": (document.getElementsByName("x-csrf-token")[0] as HTMLMetaElement).content,
                "Content-Type": "application/json",
            },
        });

        const responseJson: { success: boolean; data: Asset } = await response.json();

        if (!responseJson.success) {
            throw new Error(`Could not get the asset with id ${assetId}.`);
        }

        return responseJson.data;
    }

    public async getColorsByIds(colorIds: number[]): Promise<Color[]> {
        const response = await window.fetch(`/api/color/library/${window.application.config.context.project.id}`, {
            method: "GET",
            headers: {
                "x-csrf-token": (document.getElementsByName("x-csrf-token")[0] as HTMLMetaElement).content,
                "Content-Type": "application/json",
            },
        });

        const responseJson: { palettes: ColorPalette[] } = await response.json();

        return responseJson.palettes
            .reduce((previous, current): Color[] => previous.concat(current.colors), <Color[]>[])
            .filter((color) => colorIds.includes(Number(color.id)));
    }

    public async getAvailableColors(): Promise<Color[]> {
        const palettes = await this.getAvailablePalettes();
        return palettes.reduce((previous, current): Color[] => previous.concat(current.colors), <Color[]>[]);
    }

    public async getAvailablePalettes(): Promise<ColorPalette[]> {
        const response = await window.fetch(`/api/color/library/${window.application.config.context.project.id}`, {
            method: "GET",
            headers: {
                "x-csrf-token": (document.getElementsByName("x-csrf-token")[0] as HTMLMetaElement).content,
                "Content-Type": "application/json",
            },
        });

        const responseJson = await response.json();

        if (!responseJson.success) {
            throw new Error("Could not get the available palettes");
        }

        return responseJson.palettes;
    }

    public async getBlockSettings<T = Record<string, unknown>>(): Promise<T> {
        if (!this.blockId) {
            throw new Error("You need to instanciate the App Bridge with a block id.");
        }

        const translationLanguage = getJqueryDataByElement(document.body).translationLanguage;
        const translationLanguageSuffix = translationLanguage ? `&lang=${translationLanguage}` : "";
        const response = await window.fetch(
            `/api/document/block/${this.blockId}?settings_only=true${translationLanguageSuffix}`,
            {
                headers: {
                    "x-csrf-token": (document.getElementsByName("x-csrf-token")[0] as HTMLMetaElement).content,
                    "Content-Type": "application/json",
                },
            },
        );

        const responseJson = await response.json();

        if (!responseJson.success) {
            throw new Error("Could not get the block settings");
        }

        return responseJson.settings as T;
    }

    public async updateBlockSettings<T = Record<string, unknown>>(newSettings: T): Promise<void> {
        if (!this.blockId) {
            throw new Error("You need to instanciate the App Bridge with a block id.");
        }

        const pageId = getJqueryDatasetByClassName("page").id;
        if (!pageId) {
            throw new Error("Page ID not found");
        }

        const { translationLanguage } = getJqueryDataByElement(document.body);

        const response = await window.fetch(`/api/document/block/${pageId}/${this.sectionId}/${this.blockId}`, {
            method: "POST",
            headers: {
                "x-csrf-token": (document.getElementsByName("x-csrf-token")[0] as HTMLMetaElement).content,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                settings: newSettings,
                ...(translationLanguage ? { language: translationLanguage } : {}),
            }),
        });

        const responseJson = await response.json();

        if (!responseJson.success) {
            throw new Error("Could not update the block settings");
        }
    }

    public getEditorState(): boolean {
        return document.body.classList.contains("editor-enabled");
    }

    public getProjectId(): number {
        return window.application.config.context.project.id;
    }

    public openAssetChooser(callback: AssetChooserAssetChosenCallback): void {
        window.application.connectors.events.components.appBridge.component.onAssetChooserAssetChosen = callback;

        const $assetChooser = window.application.sandbox.config.tpl.render("c-assetchooser", {});
        window.application.connectors.events.notify(null, TerrificEvent.OpenModal, {
            modifier: "flex",
            $content: $assetChooser,
        });
    }

    public closeAssetChooser(): void {
        window.application.connectors.events.notify(null, TerrificEvent.CloseModal, {});
    }

    public async getCurrentLoggedUser(): Promise<User> {
        const response = await window.fetch("/api/user/info", {
            headers: {
                "x-csrf-token": (document.getElementsByName("x-csrf-token")[0] as HTMLMetaElement).content,
                "Content-Type": "application/json",
            },
        });

        const responseJson = await response.json();

        if (!responseJson.success) {
            throw new Error("Could not get the current logged user");
        }

        delete responseJson.success;

        return responseJson;
    }
}
