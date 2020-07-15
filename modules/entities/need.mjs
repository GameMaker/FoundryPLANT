import constants from "../constants.mjs";

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

        const needs = {
            all: entries,
            highpri: entries.filter(e => e.score >= 7),
            lowpri: entries.filter(e => e.score < 7)
        };

        return needs;
    }


}