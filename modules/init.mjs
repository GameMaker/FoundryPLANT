import NeedsApi from "./api/needs-api.mjs"
import NeedsListClass from "./apps/needs-list.mjs"
import Utils from "./utility/utils.mjs"
import constants from "./constants.mjs";
import ModuleSettings from "./utility/config.mjs";
import Socket from "./utility/socket.mjs";
import Need from "./entities/need.mjs";

// ALPHA TEST SESSION BUGS:
// TODO - Session planning - checkbox to identify what you want to do THIS session

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
    // TODO - should probably be its own module, frankly.
    if (e.altKey == false) {
        return;
    }
    switch (e.which) {
        case 49:
            ui.sidebar.activateTab("chat");
            break;
        case 50:
            ui.sidebar.activateTab("combat");
            break;
        case 51:
            if (game.user.isGM)
                ui.sidebar.activateTab("scenes");
            else
                ui.sidebar.activateTab("actors");
            break;
        case 52:
            if (game.user.isGM)
                ui.sidebar.activateTab("actors");
            else
                ui.sidebar.activateTab("items");
            break;
        case 53:
            if (game.user.isGM)
                ui.sidebar.activateTab("items");
            else
                ui.sidebar.activateTab("journal");
            break;
        case 54:
            if (game.user.isGM)
                ui.sidebar.activateTab("journal");
            else
                ui.sidebar.activateTab("tables");
            break;
        case 55:
            if (game.user.isGM)
                ui.sidebar.activateTab("tables");
            else
                ui.sidebar.activateTab("playlists");
            break;
        case 56:
            if (game.user.isGM)
                ui.sidebar.activateTab("playlists");
            else
                ui.sidebar.activateTab("compendium");
            break;
        case 57:
            if (game.user.isGM)
                ui.sidebar.activateTab("compendium");
            else
                ui.sidebar.activateTab("settings");
            break;
        case 48:
            if (game.user.isGM)
                ui.sidebar.activateTab("settings");
            break;
    }
});