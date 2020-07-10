import * as NeedsList from "./apps/needs-list.mjs"

function init() {
    // TODO - register Module settings
    // TODO - Refactor into own imported file
    // TODO - install a real log system
    console.log("FoundryPLANT | Init()");
}

function ready() {
    // TODO - Refactor into own imported file
    console.log("FoundryPLANT | Ready()");
}

function setup() {
    // TODO - Refactor into own imported file
    console.log("FoundryPLANT | Setup()");
}

function onRenderChat(app, html, data) {
    // TODO - Refactor into own imported file
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
        let user = game.users.current;
        if (user != null) {
            console.log(user.name + " needs something!");
            NeedsList.renderNeedsList();
            NeedsList.addToNeedsList(user.name);
        } else {
            console.log("Couldn't get game.user.current!")
        }
    });
}

Hooks.on("init", init);
Hooks.on("ready", ready);
Hooks.on("setup", setup);
Hooks.on("renderChatLog", onRenderChat);