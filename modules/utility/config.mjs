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
        game.settings.register(constants.moduleName, constants.settings.hotKeys, {
            name: constants.moduleName + ".Settings.hotKeys.Enable",
            hint: constants.moduleName + ".Settings.hotKeys.EnableHint",
            scope: "world",
            config: true,
            default: false,
            type: Boolean
        });
    }
}