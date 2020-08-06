import constants from "../constants.mjs"

export default class Timer {
    static intervalID = null;
    // BUG - Localize the UI

    // BUG - if you pause the game, it will restart the timer from 0. When paused, it should pause, and resume with the remaining
    // amount of time.
    start(callback) {
        Timer.intervalID = setInterval(callback, game.settings.get(constants.moduleName, constants.settings.incrementTime) * 1000);
    }

    stop() {
        if (game.user.isGM && Timer.intervalID != null) {
            clearInterval(Timer.intervalID);
            Timer.intervalID = null;
        }
    }
}