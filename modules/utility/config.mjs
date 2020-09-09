import constants from "../constants.mjs";

export default class ModuleSettings {
    /**
     * Registers various configuration settings for Module
     */
    static register() {
        game.settings.register(constants.moduleName, constants.settings.debugMode, {
            name: constants.moduleName + ".Settings.debugMode.Enable",
            hint: constants.moduleName + ".Settings.debugMode.EnableHint",
            scope: "world",
            config: true,
            default: false,
            type: Boolean
        });
    }
}