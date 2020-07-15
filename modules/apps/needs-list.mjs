import Need from "../entities/need.mjs";
import Socket from "../utility/socket.mjs";
import Utils from "../utility/utils.mjs";
import constants from "../constants.mjs";

export default class NeedsList extends Application {
    /**
     * Default Application options
     *
     * @returns {Object}
     */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: constants.moduleName,
            classes: [constants.moduleName],
            template: "modules/FoundryPLANT/templates/needs-list.html",
            width: 700,
            height: 400,
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
        // fplog("Needslist.getdata");
        let available = true;
        let sd = super.getData();
        // fplog("got superdata");
        let nds = Need.getNeeds();
        // fplog("got needs");
        return mergeObject(sd, {
            options: options,
            isGM: game.user.isGM,
            availableTab: available,
            needs: nds
        });
    }

    /**
     * for debug only - removes ALL need data.
     * BUG - remove before shipping
     */
    clearNeeds() {
        game.users.forEach(e => {
            e.unsetFlag(constants.moduleName, constants.needFlag);
        });
    }

    incrementAllScores() {
        // fplog("NeedsList.incrementAllScores");
        game.users.forEach(async (user) => {
            let userlist = user.getFlag(constants.moduleName, constants.needFlag);
            if (userlist != undefined && userlist != null) {
                userlist.forEach(need => {
                    need.score++;
                })
                // BUG - semaphore on this? it's probably quite possible to lose data if you're making changes when 
                // it's updating. Like, if I hit enter just as the incrementAlLScores is running,
                // will that drop the need? I probably need a queue system and a proper controller.
                await user.unsetFlag(constants.moduleName, constants.needFlag);
                await user.setFlag(constants.moduleName, constants.needFlag, userlist);
            }
        })
        setTimeout(Socket.refreshNeedsList, constants.tableRefreshDelay);
    }

    async updateNeedsTable() {
        // fplog("UpdatingNeedsTable()");
        let data = this.getData();
        // fplog("Got data", data);
        renderTemplate("modules/FoundryPLANT/templates/partials/needs-table.html", data).then((generatedHTML) => {
            // fplog("compiled table", generatedHTML);

            var resultContainer = document.getElementById("needs-list-table");
            resultContainer.innerHTML = generatedHTML
            // fplog("assigned table");
        });
    }

    /**
     * Defines all event listeners like click, drag, drop etc.
     *
     * @param html
     */
    activateListeners(html) {
        super.activateListeners(html);

        /**
         * Submit a new request == create a new need
         */
        html.on("click", "#fplant-needlist-req-btn", async () => {
            let needtext = $("#fplant-needlist-text");
            let newNeed = {
                id: Utils.makeGuid(),
                ownerName: game.user.name,
                ownerId: game.user.id,
                goal: needtext[0].value,
                score: 1
            }
            let currentNeeds = game.user.getFlag(constants.moduleName, constants.needFlag) || [];
            currentNeeds.push(newNeed)
            await game.user.unsetFlag(constants.moduleName, constants.needFlag);
            await game.user.setFlag(constants.moduleName, constants.needFlag, currentNeeds);
            // Rerender the list
            setTimeout(Socket.refreshNeedsList, constants.tableRefreshDelay);
            // Clear out the text field
            needtext.val('');
            // And give it focus
            needtext.focus();
        });

        /**
         * If you edit your need, enable button if the value is not empty
         */
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

        /**
         *  Handle the enter key in the text field
         */
        html.on("keyup", "#fplant-needlist-text", (e) => {
            if (e.keyCode == 13) { // enter 
                $("#fplant-needlist-req-btn").click();
            }
        });

        /**
         * DELETE ALL NEEDS!
         */
        html.on("click", "#fplant-gm-clear-all-goals-btn", () => {
            this.clearNeeds();
            // TODO - This.render seems to be completing before clearneeds is done clearing - they're
            // still in the flag when it renders, so adding an artificial delay. 
            // This is annoying.
            setTimeout(() => {
                this.render(true);
                setTimeout(Socket.refreshNeedsList, constants.tableRefreshDelay);
            }, 100);
        });

        /**
         * Satisfy a need - subtract one from its score
         */
        html.on("click", ".fplant-btn-need-satisfy", async (e) => {
            let ownerId = e.currentTarget.dataset.ownerId;
            let needId = e.currentTarget.dataset.needId;
            let owner = game.users.get(ownerId);
            let ownerNeeds = owner.getFlag(constants.moduleName, constants.needFlag);
            for (let i = 0; i < ownerNeeds.length; i++) {
                if (ownerNeeds[i].id == needId) {
                    ownerNeeds[i].score--;
                    break;
                }
            }
            await game.user.unsetFlag(constants.moduleName, constants.needFlag);
            await game.user.setFlag(constants.moduleName, constants.needFlag, ownerNeeds);
            setTimeout(Socket.refreshNeedsList, constants.tableRefreshDelay);
        })

        /**
         * Delete a need - it was a one-time need that's been met
         */
        html.on("click", ".fplant-btn-need-delete", async (e) => {
            let ownerId = e.currentTarget.dataset.ownerId;
            let needId = e.currentTarget.dataset.needId;
            let owner = game.users.get(ownerId);
            let ownerNeeds = owner.getFlag(constants.moduleName, constants.needFlag);
            fplog("Owner needs before" + ownerNeeds.length
            );
            for (let i = 0; i < ownerNeeds.length; i++) {
                if (ownerNeeds[i].id == needId) {
                    ownerNeeds.splice(i, 1);
                    break;
                }
            }
            fplog("Owner needs after" + ownerNeeds.length);
            await game.user.unsetFlag(constants.moduleName, constants.needFlag);
            await game.user.setFlag(constants.moduleName, constants.needFlag, ownerNeeds);
            setTimeout(Socket.refreshNeedsList, constants.tableRefreshDelay);
        })
    }
}