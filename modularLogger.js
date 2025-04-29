function loggerFactory() {
    const logs = [];
    const levels = ["DEBUG", "INFO", "WARN", "ERROR"];
    const levelMap = { DEBUG: 1, INFO: 2, WARN: 3, ERROR: 4 };
    const maxLevel = 4;

    return function logger(arg) {
        if (arg === undefined) {
            return function addLog(date, nameLogLevel, message) {
                if (!levels.includes(nameLogLevel)) {
                    console.log(
                        `${nameLogLevel} is an invalid log level. Please use one of the following: DEBUG, INFO, WARN, ERROR.`,
                    );
                    return;
                }

                const time = date.toTimeString().slice(0, 8);

                logs.push({ time, level: nameLogLevel, message });
            };
        } else if (typeof arg === "number" && arg >= 0) {
            let toShow;

            if (arg > maxLevel) {
                toShow = logs;
            } else {
                toShow = logs.filter((log) => levelMap[log.level] >= arg);
            }

            toShow.forEach((log) => {
                console.log(`[${log.time}][${log.level}] - ${log.message}`);
            });
        } else {
            console.log("Bad argument.");
        }
    };
}

module.exports = { loggerFactory };
