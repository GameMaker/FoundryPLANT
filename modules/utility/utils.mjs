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

    static registerHandlebarsHelpers() {
        Handlebars.registerHelper('needsToShow', function (stringId, ...arrData) {
            let needsListData = NeedsList.getData();
            let needs = [];
            needsListData.needs.all.forEach(element => {
                if (needsListData.isGM || element.ownerId == game.user.id)
                    needs.push(element);
            });
            return needs;
        });
    }
}