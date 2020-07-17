import constants from "../constants.mjs"

export default class Timer {
    static intervalID = null;
    // BUG - make this a config option
    // BUG - Localize the UI

    // BUG - if you pause the game, it will restart the timer from 0. When paused, it should pause, and resume with the remaining
    // amount of time.
    start(callback) {
        fplog("starting timer");
        if (game.user.isGM) {
            // TODO - If there's more than one GM, time will go twice as fast.
            // Maybe look and see who else is logged in when you start? Still need a way to pass it off when the "first" GM leaves.
            // fplog("I'm GM, trying to start a timer");
            Timer.intervalID = setInterval(callback, game.settings.get(constants.moduleName, constants.settings.incrementTime) * 1000);
            // } else {
            // fplog("Not a GM - no timer");
        }
    }

    stop() {
        if (game.user.isGM && Timer.intervalID != null) {
            clearInterval(Timer.intervalID);
            Timer.intervalID = null;
        }
    }
}