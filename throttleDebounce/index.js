const { debounce, throttle } = require("./throttleDebounce");

function logger(message) {
    console.log(message);
}

console.log("--- Debounce Test ---");
const debouncedLogger = debounce(logger, 2000);

debouncedLogger("Hello World !");
setTimeout(() => {
    debouncedLogger("This call must not appear because delay is too short.");
}, 1000);
setTimeout(() => {
    debouncedLogger("Only this call will be logged after 3 seconds.");
}, 2100);

setTimeout(() => {
    console.log("\n--- Throttle Test ---");
    const throttledLogger = throttle(logger, 1000);

    throttledLogger("Instant logging.");
    setTimeout(() => {
        throttledLogger("Logs after 2 seconds.");
        throttledLogger("Never log 1.");
        throttledLogger("Never log 2.");
        throttledLogger("Logs after 3 seconds, and because it's the last one.");
    }, 2000);
}, 5000);
