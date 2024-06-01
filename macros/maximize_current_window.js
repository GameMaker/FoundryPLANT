const win = ui.activeWindow
const board = $("#board");
const availableHeight = parseInt(board.css('height'));
const availableWidth = parseInt(board.css('width'));
const padTop = 10
const padLeftFull = 10
const padLeftHalf = 700
const padRight = 10
const padBottom = 80
win.render(true)
await new Promise((r) => setTimeout(r, 50));
if (win.position.left == padLeftFull) {
    // We're full-screen, toggle to half.
    win.setPosition({
        width: availableWidth - padLeftHalf - padRight,
        height: availableHeight - padTop - padBottom,
        left: padLeftHalf,
        top: padTop
    })
} else {
    // We're not full-screen, so go there.
    win.setPosition({
        width: availableWidth - padLeftFull - padRight,
        height: availableHeight - padTop - padBottom,
        left: padLeftFull,
        top: padTop
    })
    win.setPosition({
        width: availableWidth - padLeftFull - padRight,
        height: availableHeight - padTop - padBottom,
        left: padLeftFull,
        top: padTop
    })
}