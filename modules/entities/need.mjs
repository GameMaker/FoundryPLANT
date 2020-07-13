import Socket from "../utility/socket.mjs";

export default class Need {
    constructor(data = {}, entry = null) {
        this._id = data.id || null;
        this.owner = data.owner || null;
        this.goal = data.goal || null;
        this.score = data.score || null;
    }

    /**
     * Retrieves all Needs.
     *
     * @returns {{}}
     */
    static getNeeds() {
        // console.log("Foundry PLANT | getNeeds()");

        let entries = [];

        // console.log("FoundryPLANT | Checking users...");
        game.users.forEach(user => {
            // console.log("FoundryPLANT | Processing user..." + user.name);
            // TODO - Constants - enough magic strings
            let userlist = user.getFlag("FoundryPLANT", "userNeedsList");
            if (userlist == undefined ||
                userlist == null ||
                (Object.keys(userlist).length === 0 && userlist.constructor === Object)) {
                // console.log("FoundryPLANT | " + user.name + " seems to have no needs");
                return;
            }
            // console.log("FoundryPLANT | ", userlist);
            for (let i = 0; i < userlist.length; i++) {
                let need = userlist[i]
                // console.log("FoundryPLANT | " + user.name + " has a need ")
                // console.log("FoundryPLANT | ", need);
                // console.log("FoundryPLANT | ", need.owner);
                // console.log("FoundryPLANT | ", need.goal);
                // console.log("FoundryPLANT | ", need.score);
                if (need && need.owner && need.goal && need.score) {
                    console.log("Pushing it onto entries:", need);
                    entries.push(need);
                }
            }
            // console.log("FoundryPLANT | Done processing user " + user.name);
        })

        const needs = {
            all: entries,
            highpri: entries.filter(e => e.score >= 7),
            admins: entries.filter(e => e.owner === "Admin 5"),
            lowpri: entries.filter(e => e.score < 7)
        };

        // console.log("FoundryPLANT | Returning from getNeeds:", needs);
        // console.log("FoundryPLANT | And refreshing page (via socket)");
        Socket.refreshNeedsList();

        return needs;
    }


}