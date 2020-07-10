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
    const button = $(`<button id="fplant-chatneed-btn">${game.i18n.localize("FoundryPLANT.ChatNeedButton")}</button>`);
    let chatlog = html.find("#chat-log");
    if (chatlog.length === 0) {
        console.log("FoundryPLANT | onRenderChat: ERROR Could not find #chat-log");
        return;
    }
    chatlog.after(button);

    button.click(ev => {
        console.log("Button clicked!");
    });
}

Hooks.on("init", init);
Hooks.on("ready", ready);
Hooks.on("setup", setup);
Hooks.on("renderChatLog", onRenderChat);