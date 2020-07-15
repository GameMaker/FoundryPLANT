import constants from "../constants.mjs";

export default class ModuleSettings {
    /**
     * Registers various configuration settings for Module
     */
    static register() {
        game.settings.register(constants.moduleName, "showAll", {
            scope: "world",
            config: true,
            default: false,
            type: Boolean,
            onChange: value => {
                // NeedsList.render();
            }
        });

    }
}