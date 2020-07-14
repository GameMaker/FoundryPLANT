export default class Timer {
    static intervalID = null;
    static intervalTimeInSeconds = 3;

    static start(callback) {
        console.log("Starting timer");
        if (Timer.intervalID == null) {
            Timer.intervalID = setInterval(callback, Timer.intervalTimeInSeconds * 1000); // TODO - add ability to change this
        } else {
            console.log("Timer's already running.");
        }
    }

    static stop() {
        if (Timer.intervalID != null) {
            console.log("Stopping timer");
            clearInterval(Timer.intervalID);
            Timer.intervalID = null;
        } else {
            console.log("No timer to stop");
        }
    }
}