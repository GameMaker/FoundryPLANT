const win = ui.activeWindow
const board = $("#board");
const availableHeight = parseInt(board.css('height'));
const availableWidth = parseInt(board.css('width'));
const padTop = 10
const padLeft = 10
const padRight = 320
const padBottom = 80
win.render(true)
await new Promise((r) => setTimeout(r, 50));
win.setPosition({
    width: availableWidth - padLeft - padRight,
    height: availableHeight - padTop - padBottom,
    left: padLeft,
    top: padTop
})
win.setPosition({
    width: availableWidth - padLeft - padRight,
    height: availableHeight - padTop - padBottom,
    left: padLeft,
    top: padTop
})
