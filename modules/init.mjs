import NeedsApi from "./api/needs-api.mjs"
import NeedsListClass from "./apps/needs-list.mjs"
import Utils from "./utility/utils.mjs"
import constants from "./constants.mjs";
import ModuleSettings from "./utility/config.mjs";
import Socket from "./utility/socket.mjs";
import Need from "./entities/need.mjs";

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
    // fplog("Needs List got rendered");
});

Hooks.on("ready", () => {

    // Custom log function:
    window.trace = function stackTrace() {
        var err = new Error();
        return err.stack;
    }

    window.fplog = function (x) {
        if (!game.settings.get(constants.moduleName, constants.settings.debugMode)) return;
        var line = trace();
        var lines = line.split("\n");
        console.log(constants.moduleName + ": " + x + " " + lines[2].substring(lines[2].indexOf("("), lines[2].lastIndexOf(")") + 1))
    }

    // fplog("Listening on sockets");
    Socket.listen();
});

Hooks.on("renderChatLog", (app, html, data) => {
    const button = $(`<button id="fplant-chatneed-btn">${game.i18n.localize("FoundryPLANT.ChatNeedButton")}</button>`);
    let chatlog = html.find("#chat-log");
    if (chatlog.length === 0) {
        fplog("onRenderChat: ERROR Could not find #chat-log");
        return;
    }
    chatlog.after(button);

    button.click(ev => {
        NeedsList.render(true);
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