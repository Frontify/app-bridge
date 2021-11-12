import { TemplateChooserTemplateChosenCallback, TerrificEvent } from "../types/Terrific";

type UseTemplateChooserType = {
    openTemplateChooser: (callback: TemplateChooserTemplateChosenCallback) => void;
    closeTemplateChooser: () => void;
};

export const useTemplateChooser = (): UseTemplateChooserType => {
    const openTemplateChooser = (callback: TemplateChooserTemplateChosenCallback) => {
        window.application.connectors.events.components.appBridge.component.onTemplateChooserTemplateChosen = callback;

        const $templateChooser = window.application.sandbox.config.tpl.render("c-templatechooser", {});
        window.application.connectors.events.notify(null, TerrificEvent.OpenModal, {
            modifier: "flex",
            $content: $templateChooser,
        });
    };

    const closeTemplateChooser = () => {
        window.application.connectors.events.notify(null, TerrificEvent.CloseModal, {});
    };

    return { openTemplateChooser, closeTemplateChooser };
};
