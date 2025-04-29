function deepCopy(x) {
    if (x === null || typeof x !== "object") {
        return x;
    }

    if (x instanceof Date) {
        return new Date(x.getTime());
    }

    if (Array.isArray(x)) {
        return x.map((item) => deepCopy(item));
    }

    const result = {};

    for (const key of Object.keys(x)) {
        result[key] = deepCopy(x[key]);
    }

    return result;
}

function deepEquality(a, b) {
    if (a === b) {
        return a !== 0 || 1 / a === 1 / b;
    }

    if (a !== a && b !== b) {
        return true;
    }

    if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
    }

    if (
        typeof a !== "object" ||
        a === null ||
        typeof b !== "object" ||
        b === null
    ) {
        return false;
    }

    if (Array.isArray(a) !== Array.isArray(b)) {
        return false;
    }

    if (Array.isArray(a)) {
        if (a.length !== b.length) {
            return false;
        }

        for (let i = 0; i < a.length; i++) {
            if (!deepEquality(a[i], b[i])) {
                return false;
            }
        }

        return true;
    }

    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) {
        return false;
    }

    for (const key of aKeys) {
        if (!bKeys.includes(key) || !deepEquality(a[key], b[key])) {
            return false;
        }
    }

    return true;
}

module.exports = {
    deepCopy,
    deepEquality,
};
