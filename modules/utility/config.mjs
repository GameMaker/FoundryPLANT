export default class ModuleSettings {
    /**
     * Registers various configuration settings for Module
     */
    static register() {
        game.settings.register("FoundryPLANT", "showAll", {
            name: "FoundryPLANT.Settings.showAll.Enable",
            hint: "FoundryPLANT.Settings.showAll.EnableHint",
            scope: "world",
            config: true,
            default: false,
            type: Boolean,
            onChange: value => {
                NeedsList.render();
            }
        });

    }
}