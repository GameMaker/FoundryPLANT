export default class Utils {
    /**
       * Preloads templates for partials
       */
    static preloadTemplates() {
        let templates = [
            "templates/partials/need.html",
        ];

        templates = templates.map(t => `modules/FoundryPLANT/${t}`);
        loadTemplates(templates);
    }
}