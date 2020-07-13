import Need from "../entities/need.mjs";
import Socket from "../utility/socket.mjs";

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

    // TODO - add toggles to turn off absentee folks

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
     * for debug only - removes ALL need data.
     * BUG - remove before shipping
     */
    clearNeeds() {
        game.users.forEach(e => {
            e.unsetFlag("FoundryPLANT", "userNeedsList");
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
        html.on("click", "#fplant-needlist-req-btn", async () => {
            let needtext = $("#fplant-needlist-text");
            let newNeed = {
                owner: game.user.id,
                goal: needtext[0].value,
                score: 1
            }
            let currentNeeds = game.user.getFlag("FoundryPLANT", "userNeedsList") || [];
            currentNeeds.push(newNeed)
            // console.log("FoundryPLANT | Pushed newNeed");
            await game.user.unsetFlag("FoundryPLANT", "userNeedsList");
            // console.log("FoundryPLANT | unset flag");
            await game.user.setFlag("FoundryPLANT", "userNeedsList", currentNeeds);
            // console.log("FoundryPLANT | set Flag");
            // Rerender the list
            // console.log("FoundryPLANT | ", NeedsList);
            this.render(true);
            // console.log("FoundryPLANT | re-rendered page");
            // Clear out the text field
            needtext.val('');
            // console.log("FoundryPLANT | emptied text");
        });

        // If you edit your need, enable button if the value is not empty
        html.on("input", "#fplant-needlist-text", (e) => {
            let needtext = $("#fplant-needlist-text");
            let reqbtn = $("#fplant-needlist-req-btn")[0];
            if (needtext && needtext[0].value) {
                $(reqbtn).prop("disabled", false);
                $(reqbtn).fadeTo(500, 1.0);
            } else {
                $(reqbtn).prop("disabled", true);
                $(reqbtn).fadeTo(500, 0.2);
            }
        });

        // Handle the enter key in the text field
        html.on("keyup", "#fplant-needlist-text", (e) => {
            if (e.keyCode == 13) { // enter 
                $("#fplant-needlist-req-btn").click();
            }
        });

        html.on("click", "#fplant-gm-clear-all-goals-btn", () => {
            this.clearNeeds();
            Socket.refreshNeedsList();
        });
    }
}