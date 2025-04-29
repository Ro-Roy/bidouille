function debounce(func, n) {
    let timer;

    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), n);
    };
}

function throttle(func, n) {
    let ready = true;
    let lastArgs;

    return function (...args) {
        if (ready) {
            func(...args);
            ready = false;
            setTimeout(() => {
                if (lastArgs) {
                    func(...lastArgs);
                    lastArgs = null;
                    setTimeout(() => {
                        ready = true;
                    }, n);
                } else {
                    ready = true;
                }
            }, n);
        } else {
            lastArgs = args;
        }
    };
}

module.exports = { debounce, throttle };
