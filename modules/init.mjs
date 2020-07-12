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
    console.log("FoundryPLANT | Init()");
    Utils.preloadTemplates();
});

Hooks.on("ready", () => {
    console.log("FoundryPLANT | Ready()");
});

Hooks.on("setup", () => {
    console.log("FoundryPLANT | Setup()");

    window.Needs = NeedsApi
    window.NeedsList = new NeedsListClass();
    console.log("New NeedsList created, it's:");
    console.log(NeedsList);
    console.log(NeedsList.render);
    console.log(NeedsList.needs)
});

Hooks.on("renderChatLog", (app, html, data) => {
    console.log("FoundryPLANT | onRenderChat()");
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
    // BUG - Don't go to GM-only if is a player
    switch (e.which) {
        case 33:
            console.log("Switching to Chat");
            ui.sidebar.activateTab("chat");
            break;
        case 64:
            console.log("Switching to Combat");
            ui.sidebar.activateTab("combat");
            break;
        case 35:
            console.log("Switching to Scenes");
            ui.sidebar.activateTab("scenes");
            break;
        case 36:
            console.log("Switching to Characters");
            ui.sidebar.activateTab("actors");
            break;
        case 37:
            console.log("Switching to Items");
            ui.sidebar.activateTab("items");
            break;
        case 94:
            console.log("Switching to Journal");
            ui.sidebar.activateTab("journal");
            break;
        case 38:
            console.log("Switching to Tables");
            ui.sidebar.activateTab("tables");
            break;
        case 42:
            console.log("Switching to Playlists");
            ui.sidebar.activateTab("playlists");
            break;
        case 40:
            console.log("Switching to Compendia");
            ui.sidebar.activateTab("compendium");
            break;
        case 41:
            console.log("Switching to Settings");
            ui.sidebar.activateTab("settings");
            break;
        default:
            console.log(e.which);
    }
})