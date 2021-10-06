import { Asset } from "./types";
import Color from "./types/Color";
import ColorPalette from "./types/ColorPalette";
import { TerrificEvent } from "./types/TerrificEvent";
import { getJqueryDataByElement, getJqueryDatasetByClassName } from "./utilities/jquery";

export class AppBridgeNative {
    constructor(private blockId: number, private sectionId: number) {
        this.registerAppBridgeSubscriberInTerrificContext();
    }

    private registerAppBridgeSubscriberInTerrificContext() {
        if (!window.application.connectors.events.components.appBridge) {
            window.application.connectors.events.registerComponent({ id: "appBridge" });
        }
    }

    public getAssetById(assetId: number): Promise<Asset> {
        return Promise.resolve({ assetId } as unknown as Asset);
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
        const response = await window.fetch(`/api/color/library/${window.application.config.context.project.id}`, {
            method: "GET",
            headers: {
                "x-csrf-token": (document.getElementsByName("x-csrf-token")[0] as HTMLMetaElement).content,
                "Content-Type": "application/json",
            },
        });

        const responseJson: { palettes: ColorPalette[] } = await response.json();

        return responseJson.palettes.reduce(
            (previous, current): Color[] => previous.concat(current.colors),
            <Color[]>[],
        );
    }

    public getBlockSettings<T = Record<string, unknown>>(): T {
        const blockSettings = window.blockSettings[this.blockId];

        if (!blockSettings) {
            throw new Error(`Could not find settings for block ${this.blockId}`);
        }

        return blockSettings as T;
    }

    public async updateBlockSettings(newSettings: Record<string, unknown>): Promise<void> {
        const pageId = getJqueryDatasetByClassName("page").id;
        if (!pageId) {
            throw new Error("Page ID not found");
        }

        const { translationLanguage } = getJqueryDataByElement(document.body);

        if (JSON.stringify(this.getBlockSettings()) === JSON.stringify(newSettings)) {
            console.log("You have the same settings, skipping call...");
            return Promise.resolve();
        }

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
        window.blockSettings[this.blockId] = newSettings;
    }

    public getEditorState(): boolean {
        return document.body.classList.contains("editor-enabled");
    }

    public getProjectId(): number {
        return window.application.config.context.project.id;
    }

    public openAssetChooser(callback: (data: unknown) => void): void {
        window.application.connectors.events.components.appBridge.component.onAssetChooserAssetChosen = callback;

        const $assetChooser = window.application.sandbox.config.tpl.render("c-assetchooser", {});
        window.application.connectors.events.notify(null, TerrificEvent.OpenModal, {
            modifier: "flex",
            $content: $assetChooser,
        });
    }
}
