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
            title: game.i18n.localize("FoundryPLANT.Title"),
        });
    }

    /** 
     * Retrieves Data to be used in rendering template.
     *
     * @param options
     * @returns {Promise<Object>}
     */
    getData(options = {}) {
        fplog("Needslist.getdata");
        let available = true;
        let sd = super.getData();
        // fplog("got superdata");
        let nds = Need.getNeeds();
        // fplog("got needs");
        let all = mergeObject(sd, {
            options: options,
            isGM: game.user.isGM,
            availableTab: available,
            needs: nds,
            count: nds.all.length
        });
        return all;
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

    async updateNeedsTable() {
        // fplog("UpdatingNeedsTable()");
        let data = this.getData();
        // fplog("Got data");
        // data.needs.all.forEach(d => {
        // console.log(d.goal + ", " + d.score + ", " + d.rank);
        // });
        renderTemplate("modules/FoundryPLANT/templates/partials/needs-table.html", data).then((generatedHTML) => {
            // fplog("compiled table", generatedHTML);
            var resultContainer = document.getElementById("needs-list-table");
            resultContainer.innerHTML = generatedHTML
            // fplog("assigned table");
        });
    }

    async addNeed() {
        let needtext = $("#fplant-needlist-text");
        let data = this.getData();
        let newNeed = {
            id: Utils.makeGuid(),
            ownerName: game.user.name,
            ownerId: game.user.id,
            goal: needtext[0].value,
            rank: parseInt(data.needs.all.length + 1)
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
            this.addNeed();
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
            setTimeout(() => {
                this.render(true);
                setTimeout(Socket.refreshNeedsList, constants.tableRefreshDelay);
            }, constants.tableRefreshDelay);
        });

        /**
         * Deprioritize - increase its rank by 1
         */
        html.on("click", ".fplant-btn-need-down", async (e) => {
            let ownerId = e.currentTarget.dataset.ownerId;
            let needId = e.currentTarget.dataset.needId;
            let owner = game.users.get(ownerId);
            let ownerNeeds = owner.getFlag(constants.moduleName, constants.needFlag);
            let newRank = -1;
            for (let i = 0; i < ownerNeeds.length; i++) {
                if (ownerNeeds[i].id == needId) {
                    ownerNeeds[i].rank = parseInt(ownerNeeds[i].rank + 1);
                    newRank = ownerNeeds[i].rank;
                    break;
                }
            }
            await owner.unsetFlag(constants.moduleName, constants.needFlag);
            await owner.setFlag(constants.moduleName, constants.needFlag, ownerNeeds);

            // Also update and save the one it replaces
            let allNeeds = this.getData().needs.all;
            let otherOwnerId = null;
            let otherNeedId = null;
            for (let i = 0; i < allNeeds.length; i++) {
                if (allNeeds[i].rank == newRank && allNeeds[i].id != needId) {
                    otherOwnerId = allNeeds[i].ownerId;
                    otherNeedId = allNeeds[i].id;
                    break;
                }
            };
            let otherOwner = game.users.get(otherOwnerId);
            let otherOwnerNeeds = otherOwner.getFlag(constants.moduleName, constants.needFlag);
            for (let i = 0; i < otherOwnerNeeds.length; i++) {
                if (otherOwnerNeeds[i].id == otherNeedId) {
                    console.log("Fixing " + otherOwnerNeeds[i].goal);
                    otherOwnerNeeds[i].rank = parseInt(newRank - 1);
                    break;
                }
            }
            await otherOwner.unsetFlag(constants.moduleName, constants.needFlag);
            await otherOwner.setFlag(constants.moduleName, constants.needFlag, otherOwnerNeeds);
            setTimeout(Socket.refreshNeedsList, constants.tableRefreshDelay);
        })

        /**
         * Prioritize - increase its rank by 1
         */
        html.on("click", ".fplant-btn-need-up", async (e) => {
            let ownerId = e.currentTarget.dataset.ownerId;
            let needId = e.currentTarget.dataset.needId;
            let owner = game.users.get(ownerId);
            let ownerNeeds = owner.getFlag(constants.moduleName, constants.needFlag);
            let newRank = -1;
            for (let i = 0; i < ownerNeeds.length; i++) {
                if (ownerNeeds[i].id == needId) {
                    ownerNeeds[i].rank = parseInt(ownerNeeds[i].rank - 1);
                    newRank = ownerNeeds[i].rank;
                    break;
                }
            }
            await owner.unsetFlag(constants.moduleName, constants.needFlag);
            await owner.setFlag(constants.moduleName, constants.needFlag, ownerNeeds);

            // Also update and save the one it replaces
            let allNeeds = this.getData().needs.all;
            console.log("The current ID is " + needId);
            let otherOwnerId = null;
            let otherNeedId = null;
            for (let i = 0; i < allNeeds.length; i++) {
                console.log(allNeeds[i]);
                if (allNeeds[i].rank == newRank && allNeeds[i].id != needId) {
                    console.log("Found it: " + allNeeds[i].goal + " (id: " + allNeeds[i].id + ")");
                    otherOwnerId = allNeeds[i].ownerId;
                    otherNeedId = allNeeds[i].id;
                    break;
                }
            };
            console.log("Fixing other with ID " + otherNeedId);
            let otherOwner = game.users.get(otherOwnerId);
            console.log("Other owner is " + otherOwner);
            let otherOwnerNeeds = otherOwner.getFlag(constants.moduleName, constants.needFlag);
            for (let i = 0; i < otherOwnerNeeds.length; i++) {
                if (otherOwnerNeeds[i].id == otherNeedId) {
                    console.log("Fixing " + otherOwnerNeeds[i].goal);
                    otherOwnerNeeds[i].rank = parseInt(newRank + 1);
                    break;
                }
            }
            await otherOwner.unsetFlag(constants.moduleName, constants.needFlag);
            await otherOwner.setFlag(constants.moduleName, constants.needFlag, otherOwnerNeeds);
            setTimeout(Socket.refreshNeedsList, constants.tableRefreshDelay);
        })

        /**
         * Delete a need - it was a one-time need that's been met
         */
        html.on("click", ".fplant-btn-need-delete", async (e) => {
            // fplog("Current user ID " + game.user.id);
            let ownerId = e.currentTarget.dataset.ownerId;
            // fplog("deleted need owner ID " + ownerId);
            let needId = e.currentTarget.dataset.needId;
            let owner = game.users.get(ownerId);
            // fplog("owner is " + owner.name);
            let ownerNeeds = owner.getFlag(constants.moduleName, constants.needFlag);
            // fplog("Owner needs before" + ownerNeeds.length);
            let deletedRank = -1;
            for (let i = 0; i < ownerNeeds.length; i++) {
                if (ownerNeeds[i].id == needId) {
                    deletedRank = ownerNeeds[i].rank;
                    console.log("Deleted the one with rank " + deletedRank);
                    ownerNeeds.splice(i, 1);
                    break;
                }
            }
            // fplog("Owner needs after" + ownerNeeds.length);
            await owner.unsetFlag(constants.moduleName, constants.needFlag);
            await owner.setFlag(constants.moduleName, constants.needFlag, ownerNeeds);

            // Prioritize all the ones below it
            // TODO: If you're GMing on the desktop app, deleting is horrifically bad
            // It deletes whole blocks - I think it might be a timing issue, or the way it handles await?
            let dirtyBit = false;
            let needs = null;
            // For each user
            console.log("users:");
            console.log(game.users);
            game.users.forEach(async (u) => {
                // Clear dirty bit
                dirtyBit = false;
                // Get that user's needs
                console.log(u.name + "'s Needs:");
                needs = u.getFlag(constants.moduleName, constants.needFlag);
                console.log(needs);
                // For each of that user's needs,
                if (needs != undefined) {
                    console.log("User has needs, so checking");
                    needs.forEach(n => {
                        // if it's greater than the deleted rank
                        if (n.rank > deletedRank) {
                            // decrement rank 
                            console.log("Decrementing " + n.goal + " from rank " + n.rank);
                            n.rank = parseInt(n.rank - 1);
                            // and set a dirty bit
                            dirtyBit = true;
                        }
                    })
                    console.log(needs);
                    // If dirty bit is set, replace player's needs
                    if (dirtyBit) {
                        console.log("Dirty bit, so saving needs:");
                        console.log(needs);
                        let needCopy = needs;
                        await u.unsetFlag(constants.moduleName, constants.needFlag);
                        await u.setFlag(constants.moduleName, constants.needFlag, needCopy);
                    }
                }
            });
            setTimeout(Socket.refreshNeedsList, constants.tableRefreshDelay);
        })
    }
}