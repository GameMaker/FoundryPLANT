export class NeedsList extends Application {
    /**
     * Default Application options
     *
     * @returns {Object}
     */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: "FoundryPLANT",
            classes: ["foundryPLANT"],
            template: "modules/FoundryPLANT/templates/needs-list.html",
            width: 300,
            height: 600,
            minimizable: true,
            resizable: true,
            title: game.i18n.localize("FoundryPLANT.NeedsList.Title"),
            // tabs: [{ navSelector: ".log-tabs", contentSelector: ".log-body", initial: "progress" }]
        });
    }

    /** 
     * Retrieves Data to be used in rendering template.
     *
     * @param options
     * @returns {Promise<Object>}
     */
    getData(options = {}) {
        let available = true; //game.settings.get("forien-quest-log", "availableQuests");
        return mergeObject(super.getData(), {
            options: options,
            isGM: game.user.isGM,
            availableTab: available,
            // canAccept: game.settings.get("forien-quest-log", "allowPlayersAccept"),
            // canCreate: game.settings.get("forien-quest-log", "allowPlayersCreate"),
            // showTasks: game.settings.get("forien-quest-log", "showTasks"),
            // style: game.settings.get("FoundryPLANT", "navStyle"),
            // titleAlign: game.settings.get("forien-quest-log", "titleAlign"),
            // questTypes: Quest.getQuestTypes(),
            // quests: Quest.getQuests(this.sortBy, this.sortDirection, available, true)
        });
    }
}

export function renderNeedsList() {
    (new NeedsList()).render(true);
}

export function addToNeedsList(username) {
    console.log("Adding " + username + " to the needs list? Maybe?");
    let needslist = $("#FoundryPLANT-needs-list");
    if (needslist == null) {
        console.log("Couldn't find #FoundryPLANT-needs-list");
        return;
    }
    // TODO - this isn't showing up. Not sure if the syntax is wrong here,
    // or it's a timing thing with renderneedslist, or what.
    // next step - see how the quest log template works.
    needslist.append("<div class='one-need'>" + username + " needs something</div>");
}