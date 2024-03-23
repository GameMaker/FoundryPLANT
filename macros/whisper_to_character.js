let cs = canvas.tokens.controlled;
if (cs.length == 0) {
    ui.notifications.warn("Select one or more tokens first.")
    return;
}
let charnames = "to:<ul>"
cs.forEach(c => {
    charnames += "<li> "
    charnames += c.document.name
})
charnames += "</ul>"
let d = new Dialog({
    title: "Whispering...",
    content: `
      <form class="flexcol">
        <div class="form-group">
            <label for="textbox">Whaddaya say?</label>
            <input type="text" name="textbox" placeholder="Whaddaya say?">
        </div>
        <div>` + charnames + `</div>
        </form>
    `,
    buttons: {
        no: {
            icon: '<i class="fas fa-times"></i>',
            label: 'Cancel'
        },
        yes: {
            icon: '<i class="fas fa-comment"></i>',
            label: 'Send',
            callback: (html) => {
                let text = html.find('[name="textbox"]').val();
                cs.forEach(c => {
                    ChatMessage.create({
                        content: text,
                        whisper: ChatMessage.getWhisperRecipients(c.document.name),
                    });   
                });
            }
        },
    },
    default: 'yes'
}).render(true)