console.log("need is here");

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

        // TODO - get from player flags

        const needs = {
            all: entries,
            highpri: entries.filter(e => e.score >= 7),
            admins: entries.filter(e => e.owner === "Admin 5"),
            lowpri: entries.filter(e => e.score < 7)
        };

        return needs;
    }


}