export default class Utils {
    /**
       * Preloads templates for partials
       */
    static preloadTemplates() {
        let templates = [
            "templates/partials/need-row.html",
            "templates/partials/needs-table.html",
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

        Handlebars.registerHelper('isGM', () => {
            return game.user.isGM;
        });
    }

    static makeGuid() {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        // then to call it, plus stitch in '4' in the third group
        return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    }
}