console.log("FoundryPLANT | Loaded");

function init() {
    console.log("FoundryPLANT | Init()");
}

function ready() {
    console.log("FoundryPLANT | Ready()");
}

Hooks.on("init", init);
Hooks.on("ready", ready);