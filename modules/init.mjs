import NeedsApi from "./api/needs-api.mjs"
import NeedsListClass from "./apps/needs-list.mjs"
import Utils from "./utility/utils.mjs"
import constants from "./constants.mjs";
import ModuleSettings from "./utility/config.mjs";
import Socket from "./utility/socket.mjs";
import Need from "./entities/need.mjs";
import NeedsList from "./apps/needs-list.mjs";

Hooks.on("init", () => {
    ModuleSettings.register()

    // CONFIG.debug.hooks = true;

    Utils.preloadTemplates();
    Utils.registerHandlebarsHelpers();
});

Hooks.on("setup", () => {
    window.NeedsList = new NeedsListClass();
});

Hooks.on("renderNeedsList", () => {
});

Hooks.on("ready", () => {

    // Custom log function:
    window.fplog = function (data, force = false) {
        if (!force && game.settings.get(constants.moduleName, constants.settings.debugMode) === false) return;

        var err = new Error();
        var line = err.stack;
        var lines = line.split("\n");
        // console.log(lines);
        // USUALLY:
        // Line 0 == "Error"
        // Line 1 == the trace function location
        // Line 2 == the fplog function location
        // Line 3 == the calling function location
        // However, if you call this from a static function, it might be shorter - in that case,
        // the last line is the caller.
        var callerline;
        if (lines.length > 3) callerline = lines[3];
        else callerline = lines[lines.length - 1];
        var fullfile = callerline.substring(callerline.indexOf("("), callerline.lastIndexOf(")"));
        // Sometimes, if you're calling fplog from the same esmodule that you declare the log, 
        // the calling file will NOT be listed in parens, just in straight HRL form.
        // We're going to split on slashes anyway, so just take the whole line.
        if (fullfile === "") fullfile = callerline;
        var fileparts = fullfile.split("/");
        var fileloc = fileparts[fileparts.length - 1];
        var prefix = constants.moduleName + " (" + fileloc + "):"
        console.log(prefix, data);
    }

    fplog("Listening on sockets");
    Socket.listen();
});

Hooks.on("renderChatLog", (app, html, data) => {
    if (game.settings.get(constants.moduleName, constants.settings.needList) === false) { return; }
    const button = $(`<button id="fplant-chatneed-btn">${game.i18n.localize("FoundryPLANT.ChatNeedButton")}</button>`);
    let chatlog = html.find("#chat-log");
    if (chatlog.length === 0) {
        fplog("onRenderChat: ERROR Could not find #chat-log");
        return;
    }
    chatlog.after(button);

    button.click(ev => {
        window.NeedsList.render(true);
    });
});

$(document).keydown(function (e) {
    if (!game.settings.get(constants.moduleName, constants.settings.hotKeys)) { return; }
    if (e.altKey == true) {
        let shouldEat = false;
        switch (e.which) {
            case 49:
                ui.sidebar.activateTab("chat");
                shouldEat = true;
                break;
            case 50:
                ui.sidebar.activateTab("combat");
                shouldEat = true;
                break;
            case 51:
                if (game.user.isGM) {
                    ui.sidebar.activateTab("scenes");
                    shouldEat = true;
                } else {
                    ui.sidebar.activateTab("actors");
                    shouldEat = true;
                }
                break;
            case 52:
                if (game.user.isGM) {
                    ui.sidebar.activateTab("actors");
                    shouldEat = true;
                } else {
                    ui.sidebar.activateTab("items");
                    shouldEat = true;
                }
                break;
            case 53:
                if (game.user.isGM) {
                    ui.sidebar.activateTab("items");
                    shouldEat = true;
                } else {
                    ui.sidebar.activateTab("journal");
                    shouldEat = true;
                }
                break;
            case 54:
                if (game.user.isGM) {
                    ui.sidebar.activateTab("journal");
                    shouldEat = true;
                } else {
                    ui.sidebar.activateTab("tables");
                    shouldEat = true;
                }
                break;
            case 55:
                if (game.user.isGM) {
                    ui.sidebar.activateTab("tables");
                    shouldEat = true;
                } else {
                    ui.sidebar.activateTab("playlists");
                    shouldEat = true;
                }
                break;
            case 56:
                if (game.user.isGM) {
                    ui.sidebar.activateTab("playlists");
                    shouldEat = true;
                } else {
                    ui.sidebar.activateTab("compendium");
                    shouldEat = true;
                }
                break;
            case 57:
                if (game.user.isGM) {
                    ui.sidebar.activateTab("compendium");
                    shouldEat = true;
                } else {
                    ui.sidebar.activateTab("settings");
                    shouldEat = true;
                } break;
            case 48:
                if (game.user.isGM) {
                    // fplog("Here we go - calling FixNeeds");
                    // window.NeedsList.fixNeeds();
                    ui.sidebar.activateTab("settings");
                    shouldEat = true;
                }
                break;
            case 191:
                let name = game.settings.get(constants.moduleName, constants.settings.cheatSheet);
                if (name != null && name != "") {
                    let entry = game.journal.getName(name);
                    if (entry != null) {
                        game.journal.getName(name).sheet.render(true);
                        shouldEat = true;
                    } else {
                        console.log(constants.moduleName + ": Could not find entry with name '" + name + "'");
                    }
                } else {
                    console.log(constants.moduleName + ": Could not get a name from setting " + constants.moduleName + "." + constants.settings.cheatSheet);
                }
                break;
        }
        if (shouldEat) {
            e.stopPropagation();
        }
    }
});
