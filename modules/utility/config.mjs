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
        game.settings.register(constants.moduleName, constants.settings.incrementTime, {
            name: constants.moduleName + ".Settings.incrementTime.Enable",
            hint: constants.moduleName + ".Settings.incrementTime.EnableHint",
            scope: "world",
            config: true,
            default: 36,
            type: Number,
            onChange: value => {
                if (value < 1) {
                    game.settings.set(constants.moduleName, constants.settings.incrementTime, 1);
                }
                window.Timer.stop();
                window.Timer.start(window.NeedsList.incrementAllScores);
            }
        });
    }
}