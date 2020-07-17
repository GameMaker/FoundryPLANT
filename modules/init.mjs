import NeedsApi from "./api/needs-api.mjs"
import NeedsListClass from "./apps/needs-list.mjs"
import Utils from "./utility/utils.mjs"
import constants from "./constants.mjs";
import ModuleSettings from "./utility/config.mjs";
import Socket from "./utility/socket.mjs";
import Need from "./entities/need.mjs";
import Timer from "./utility/timer.mjs";

Hooks.on("init", () => {
    ModuleSettings.register()

    // CONFIG.debug.hooks = true;

    Utils.preloadTemplates();
    Utils.registerHandlebarsHelpers();
});

function incrementAllScores() {
    // fplog("Init.IncrementAllScores");
    NeedsList.incrementAllScores();
}

// BUG - GM can click on any score and edit it directly.
// BUG - add an 'active' checkbox for each - timer does not increase if not active
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


    // TODO - If there are two GMs, scores will go up twice as fast
    if (game.user.isGM) {
        window.Timer = new Timer();
    }

    if (!game.paused)
        Timer.start(incrementAllScores);
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

Hooks.on("pauseGame", () => {
    // fplog("Game pause triggered, game is " + (game.paused ? "paused" : "not paused"));
    if (game.paused) {
        Timer.stop();
    } else {
        Timer.start(incrementAllScores);
    }
})

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