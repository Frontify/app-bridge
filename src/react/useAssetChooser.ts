import { AssetChooserAssetChosenCallback, TerrificEvent } from "../types/Terrific";

type UseAssetChooserType = {
    openAssetChooser: (callback: AssetChooserAssetChosenCallback) => void;
    closeAssetChooser: () => void;
};

const useAssetChooser = (): UseAssetChooserType => {
    const openAssetChooser = (callback: AssetChooserAssetChosenCallback) => {
        window.application.connectors.events.components.appBridge.component.onAssetChooserAssetChosen = callback;

        const $assetChooser = window.application.sandbox.config.tpl.render("c-assetchooser", {});
        window.application.connectors.events.notify(null, TerrificEvent.OpenModal, {
            modifier: "flex",
            $content: $assetChooser,
        });
    };

    const closeAssetChooser = () => {
        window.application.connectors.events.notify(null, TerrificEvent.CloseModal, {});
    };

    return { openAssetChooser, closeAssetChooser };
};

export default useAssetChooser;
