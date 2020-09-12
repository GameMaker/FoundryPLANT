import constants from "../constants.mjs";

export default class ModuleSettings {
    /**
     * Registers various configuration settings for Module
     */
    static register() {
        game.settings.register(constants.moduleName, constants.settings.debugMode, {
            name: constants.moduleName + ".Settings." + constants.settings.debugMode + ".Enable",
            hint: constants.moduleName + ".Settings." + constants.settings.debugMode + ".EnableHint",
            scope: "world",
            config: true,
            default: false,
            type: Boolean
        });
        game.settings.register(constants.moduleName, constants.settings.hotKeys, {
            name: constants.moduleName + ".Settings." + constants.settings.hotKeys + ".Enable",
            hint: constants.moduleName + ".Settings." + constants.settings.hotKeys + ".EnableHint",
            scope: "world",
            config: true,
            default: false,
            type: Boolean
        });
        game.settings.register(constants.moduleName, constants.settings.cheatSheet, {
            name: constants.moduleName + ".Settings." + constants.settings.cheatSheet + ".Name",
            hint: constants.moduleName + ".Settings." + constants.settings.cheatSheet + ".NameHint",
            scope: "world",
            config: true,
            default: "Cheat Sheet",
            type: String
        });
    }
}