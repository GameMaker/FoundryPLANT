import Need from "../entities/need.mjs";

export default class NeedsList extends Application {
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
        });
    }

    /** 
     * Retrieves Data to be used in rendering template.
     *
     * @param options
     * @returns {Promise<Object>}
     */
    getData(options = {}) {
        let available = true;
        return mergeObject(super.getData(), {
            options: options,
            isGM: game.user.isGM,
            availableTab: available,
            needs: Need.getNeeds()
        });
    }

    /**
     * Defines all event listeners like click, drag, drop etc.
     *
     * @param html
     */
    activateListeners(html) {
        super.activateListeners(html);

        // Click to make a new request
        html.on("click", "#fplant-needlist-req-btn", () => {
            let needtext = $("#fplant-needlist-text")[0].value;
            // TODO - Entities.setflag, then possibly re-jigger so the needs list
            // is built off that flag. Hopefully that will re-sync?
            let newNeed = {
                owner: game.users.current.name,
                goal: needtext,
                score: 1
            }
            console.log("Making a new need");
            let currentNeeds = game.users.current.getFlag("FoundryPLANT", "userNeedsList");
            if (currentNeeds == null) {
                console.log("User had no needs, making a new collection");
                currentNeeds = [];
            }
            console.log(currentNeeds);
            currentNeeds.push({ newNeed })
            game.users.current.setFlag("FoundryPLANT", "userNeedsList", currentNeeds)
        });

        // If you edit your need, enable button if the value is not empty
        html.on("input", "#fplant-needlist-text", () => {
            let needtext = $("#fplant-needlist-text");
            console.log(needtext);
            console.log(needtext[0].value);
            if (needtext && needtext[0].value) {
                console.log("Text changed to:");
                console.log(needtext[0].value);
                $("#fplant-needlist-req-btn").prop("disabled", false);
            } else {
                console.log("Text is empty?")
                console.log(needtext[0].value);
                $("#fplant-needlist-req-btn").prop("disabled", true);
            }
        });
    }
}