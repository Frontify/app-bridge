import { Asset } from "./Asset";

export enum TerrificEvent {
    OpenModal = "onOpenModal",
    CloseModal = "onCloseModal",
}

export type AssetChooserResult = { screenData: Asset[] };

export type AssetChooserAssetChosenCallback = (assetChooserResult: AssetChooserResult) => void;
