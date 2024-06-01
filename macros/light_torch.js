// From https://www.reddit.com/r/FoundryVTT/comments/s313x2/actor_light_vision_macros_v9_with_working_light/?utm_source=share&utm_medium=web2x&context=3
let tokens = canvas.tokens.controlled;
if (tokens.length == 0) {
    ui.notifications.warn("Select one or more tokens first.")
    return;
}
tokens.forEach(token => {
    token.document.update({ light: { dim: 40, bright: 20, color: "#ff830f", alpha: 0.35, angle: 360, animation: { type: "torch", speed: 5, intensity: 5 } } });
})