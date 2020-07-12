import Need from "../entities/need.mjs";

/**
 * Needs public Api available under `Needs.`
 */
export default class NeedsApi {
    /**
     * Retrieves Need instance for given need ID
     *
     * @param needId
     * @returns {Need}
     */
    static get(needId) {
        return Need.get(needId);
    }

    /**
     * Creates new Need programmatically through API
     *
     * @param data
     * @returns {Need}
     */
    static create(data = {}) {
        if (data.title === undefined) {
            throw new Error(game.i18n.localize("FoundryPLANT.Api.create.title"));
        }

        return new Need({});
    }
}
