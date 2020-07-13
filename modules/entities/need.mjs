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
        let entries = [];

        game.users.forEach(user => {
            // TODO - Constants - enough magic strings
            let userlist = user.getFlag("FoundryPLANT", "userNeedsList");
            if (userlist == undefined ||
                userlist == null ||
                (Object.keys(userlist).length === 0 && userlist.constructor === Object)) {
                return;
            }
            for (let i = 0; i < userlist.length; i++) {
                let need = userlist[i]
                if (need && need.owner && need.goal && need.score) {
                    entries.push(need);
                }
            }
        })

        const needs = {
            all: entries,
            highpri: entries.filter(e => e.score >= 7),
            admins: entries.filter(e => e.owner === "Admin 5"),
            lowpri: entries.filter(e => e.score < 7)
        };

        Socket.refreshNeedsList();

        return needs;
    }


}