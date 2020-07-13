import NeedsApi from "./api/needs-api.mjs"
import NeedsListClass from "./apps/needs-list.mjs"
import Utils from "./utility/utils.mjs"
import constants from "./constants.mjs";
import ModuleSettings from "./utility/config.mjs";
import Socket from "./utility/socket.mjs";
import Need from "./entities/need.mjs";

Hooks.on("init", () => {
    ModuleSettings.register()

    // TODO - install a real log system
    Utils.preloadTemplates();
    Utils.registerHandlebarsHelpers();
});

Hooks.on("ready", () => {
});

Hooks.on("setup", () => {
    window.Needs = NeedsApi
    window.NeedsList = new NeedsListClass();
});

Hooks.on("renderChatLog", (app, html, data) => {
    // TODO - different prompts for DM and player?
    const button = $(`<button id="fplant-chatneed-btn">${game.i18n.localize("FoundryPLANT.ChatNeedButton")}</button>`);
    let chatlog = html.find("#chat-log");
    if (chatlog.length === 0) {
        console.log("FoundryPLANT | onRenderChat: ERROR Could not find #chat-log");
        return;
    }
    chatlog.after(button);

    button.click(ev => {
        NeedsList.render(true);
    });
});

$(document).keypress(function (e) {
    // TODO - should probably be its own module, frankly.
    switch (e.which) {
        case 33:
            ui.sidebar.activateTab("chat");
            break;
        case 64:
            ui.sidebar.activateTab("combat");
            break;
        case 35:
            if (game.user.isGM)
                ui.sidebar.activateTab("scenes");
            else
                ui.sidebar.activateTab("actors");
            break;
        case 36:
            if (game.user.isGM)
                ui.sidebar.activateTab("actors");
            else
                ui.sidebar.activateTab("items");
            break;
        case 37:
            if (game.user.isGM)
                ui.sidebar.activateTab("items");
            else
                ui.sidebar.activateTab("journal");
            break;
        case 94:
            if (game.user.isGM)
                ui.sidebar.activateTab("journal");
            else
                ui.sidebar.activateTab("tables");
            break;
        case 38:
            if (game.user.isGM)
                ui.sidebar.activateTab("tables");
            else
                ui.sidebar.activateTab("playlists");
            break;
        case 42:
            if (game.user.isGM)
                ui.sidebar.activateTab("playlists");
            else
                ui.sidebar.activateTab("compendium");
            break;
        case 40:
            if (game.user.isGM)
                ui.sidebar.activateTab("compendium");
            else
                ui.sidebar.activateTab("settings");
            break;
        case 41:
            if (game.user.isGM)
                ui.sidebar.activateTab("settings");
            break;
    }
});