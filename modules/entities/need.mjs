import constants from "../constants.mjs";

export default class Need {
    constructor(data = {}, entry = null) {
        this._id = data.id || null;
        this.owner = data.owner || null;
        this.goal = data.goal || null;
        this.rank = data.rank || null;
    }

    /**
     * Retrieves all Needs.
     *
     * @returns {{}}
     */
    static getNeeds() {
        let entries = [];

        game.users.forEach(user => {
            let userlist = user.getFlag(constants.moduleName, constants.needFlag);
            if (userlist == undefined ||
                userlist == null ||
                (Object.keys(userlist).length === 0 && userlist.constructor === Object)) {
                return;
            }
            userlist.forEach(need => {
                entries.push(need);
            })
        })

        // Ascending by rank
        entries.sort((a, b) => {
            if (a.rank > b.rank)
                return 1;
            if (a.rank < b.rank)
                return -1;
            return 0;
        });

        const needs = {
            all: entries,
            highpri: entries.filter(e => e.rank <= 3),
            lowpri: entries.filter(e => e.rank > 3)
        };

        return needs;
    }


}