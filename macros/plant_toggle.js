// Foundry PLANT - the PLAyer Needs Tracker timer.
// This macro creates a small toolbar next to the Macro hotbar, which tracks how long it's been
// since you gave each character focus in a scene. When a character gets a chance to take
// center stage, just click on their icon to reset their bar.

/* Tested in Firefox on Windows. Unsupported. :) */

// TO USE: Just edit the following few variables:
// Add the party. Open each of the party characters, and copy their ID here.
var player_ids = [/* Alceste */ "KBwdAExcKK0Q5NHk",
                /* Curus */ "MMNLSKx0ux0iRM4R",
                /* Daiyana */ "9295xomxzUfOJIk2",
                /* Remo */ "eLuJb5fkLgXKUIOP",
                /* Ru */ "NXkhkjIFiFMQf8JO"];
// What percentage each player's bar fills every tick (see tickTime).
// Ex: "5" = 10 minutes to fill, 15 = ~3.5 minutes to fill.
var player_fill_speeds = [/* Alceste */ 2.5,
                /* Curus */ 4,
                /* Daiyana */ 4.5,
                /* Remo */ 3,
                /* Ru */ 5]
// Specify how often the bars should increase.
const tickTime = 30; /* seconds */
// width and height of the character icons, in case you have a lower screen resolution or more characters.
const iconWidth = 60; /* Pixels */
const iconHeight = 60; /* Pixels */

////////////////////////////////////////////////////////
// Set up the on/off button
$('#plant-toggle-button').remove();
$('#action-bar').append('<div id="plant-toggle-button">ON</div>');
var buttons = $('#plant-toggle-button');
var button = buttons[0];
function makeBox(element) {
    element.style.height = iconHeight + 'px';
    element.style.width = iconHeight + 'px';
}
button.style.borderRadius = '40px';
button.style.display = "flex";
button.style.alignItems = "center";
button.style.justifyContent = 'center';

makeBox(button)
var is_on = true;

// Set up the timer

function updateBar(i, pct) {
    var bar = $('#plant-icon-bar-' + i)[0];
    bar.style.height = pct + "%";
    bar.style.top = (100 - pct) + "%"
    if (pct < 50) {
        bar.style.background = "green";
        bar.style.opacity = "40%";
    } else if (pct < 80) {
        bar.style.background = "yellow";
        bar.style.opacity = "50%";
    } else {
        bar.style.background = "red";
        bar.style.opacity = "60%";
    }
    var img = $('#plant-icon-image-' + i)[0];
    img.style.top = "-" + pct + "%";
}

function tick() {
    i = 0;
    players.forEach(player => {
        var pct = Math.min(player.plantFillAmount + player.plantFillSpeed, 100);
        player.plantFillAmount = pct;
        updateBar(i, pct);
        i++
    }
    )
}

function toggle(e) {
    if (is_on) {
        button.style.color = 'darkRed';
        button.style.background = 'red';
        button.innerText = 'OFF';
        clearInterval(window.plant_timer_id)
    } else {
        button.style.color = 'lightGreen';
        button.style.background = 'green';
        button.innerText = 'ON';
        window.plant_timer_id = setInterval(tick, tickTime * 1000);
    }
    is_on = !is_on;
}

// Callback
function resetTimer(e) {
    var i = e.target.getAttribute('data-plant-idx');
    var p = players[i];
    p.plantFillAmount = 0;
    updateBar(i, 0);
    e.stopPropagation();
}

var i = 0;
var players = [];
player_ids.forEach(id => {
    $('#plant-icon-' + i).remove();
    var p = game.actors.get(id);
    players.push(p);
    p["plantFillSpeed"] = player_fill_speeds[i];
    if (p["plantFillAmount"] == undefined) {
        p["plantFillAmount"] = 0;
    }
    $('#action-bar').append('<div id="plant-icon-' + i + '" data-plant-idx=' + i + '></div>');
    $('#plant-icon-' + i).on('click', resetTimer);
    $('#plant-icon-' + i).append('<div id="plant-icon-bar-' + i + '" data-plant-idx=' + i + ' style="height:40%;position:relative;top:60%;z-index:0;background-color:green;opacity:50%"></div>')
    $('#plant-icon-bar-' + i).on('click', resetTimer);
    $('#plant-icon-' + i).append('<img id="plant-icon-image-' + i + '" style="width:' + iconWidth + 'px;height:' + iconHeight + 'px;position:relative;top:-28px;z-index:-10" src="' + p.img + '" />');
    makeBox($('#plant-icon-' + i)[0])
    i++;
});

buttons.on('click', toggle);
// Tick once to set the percentages
tick();
// Toggle once to set the button state correctly.
toggle();