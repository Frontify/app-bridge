import { Asset, Template } from ".";

export enum TerrificEvent {
    OpenModal = "onOpenModal",
    CloseModal = "onCloseModal",
}

export type AssetChooserResult = { screenData: Asset[] };
export type TemplateChooserResult = { template: Template };

export type AssetChooserAssetChosenCallback = (assetChooserResult: AssetChooserResult) => void;

export type TemplateChooserTemplateChosenCallback = (templateChooserResult: TemplateChooserResult) => void;
