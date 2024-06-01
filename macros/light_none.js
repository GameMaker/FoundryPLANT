// From https://www.reddit.com/r/FoundryVTT/comments/s313x2/actor_light_vision_macros_v9_with_working_light/?utm_source=share&utm_medium=web2x&context=3
let tokens = canvas.tokens.controlled;
if (tokens.length == 0) {
    ui.notifications.warn("Select one or more tokens first.")
    return;
}
tokens.forEach(token => {
    token.document.update({light:{ dim: 0, bright: 0, color: "#000000", alpha: 1, animation:{ type: "none"}}});
})