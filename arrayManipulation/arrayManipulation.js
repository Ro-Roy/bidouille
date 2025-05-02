function sortArray(array) {
    const isNumber = (val) => typeof val === "number";
    const isString = (val) => typeof val === "string";
    const isArray = (val) => Array.isArray(val);
    const isObject = (val) =>
        val && typeof val === "object" && !Array.isArray(val);

    const numbers = [];
    const strings = [];
    const arrays = [];
    const objects = [];

    for (const item of array) {
        if (isNumber(item)) {
            numbers.push(item);
        } else if (isString(item)) {
            strings.push(item);
        } else if (isArray(item)) {
            arrays.push(item);
        } else if (isObject(item)) {
            objects.push(item);
        }
    }

    for (let i = 1; i < numbers.length; i++) {
        let j = i;

        while (j > 0 && numbers[j - 1] > numbers[j]) {
            [numbers[j - 1], numbers[j]] = [numbers[j], numbers[j - 1]];
            j--;
        }
    }

    for (let i = 1; i < strings.length; i++) {
        let j = i;

        while (
            j > 0 &&
            (strings[j - 1].toLowerCase() > strings[j].toLowerCase() ||
                (strings[j - 1].toLowerCase() === strings[j].toLowerCase() &&
                    strings[j - 1].length > strings[j].length))
        ) {
            [strings[j - 1], strings[j]] = [strings[j], strings[j - 1]];
            j--;
        }
    }

    for (const arr of arrays) {
        for (let i = 1; i < arr.length; i++) {
            let j = i;

            while (j > 0 && arr[j - 1] > arr[j]) {
                [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
                j--;
            }
        }
    }

    arrays.sort((a, b) => {
        if (a.length === 0) {
            return -1;
        }

        if (b.length === 0) {
            return 1;
        }

        return a[0] - b[0];
    });

    objects.sort((a, b) => {
        const keysA = Object.keys(a).sort();
        const keysB = Object.keys(b).sort();
        const minLen = Math.min(keysA.length, keysB.length);

        for (let i = 0; i < minLen; i++) {
            const keyA = keysA[i];
            const keyB = keysB[i];

            if (keyA !== keyB) {
                return keyA < keyB ? -1 : 1;
            }

            if (a[keyA] !== b[keyB]) {
                return a[keyA] < b[keyB] ? -1 : 1;
            }
        }

        return keysA.length - keysB.length;
    });

    array.length = 0;
    array.push(...numbers, ...strings, ...arrays, ...objects);
}

function activateArray(array) {
    const shouldActivate = array.includes("activate");

    if (!shouldActivate) {
        return array.map(deepClone);
    }

    const result = [];

    for (const item of array) {
        if (item === "activate") {
            continue;
        }

        if (typeof item === "number") {
            result.push(item * item);
        } else if (typeof item === "string") {
            result.push("super " + item);
        } else if (Array.isArray(item)) {
            result.push(activateArray(item));
        } else if (item && typeof item === "object") {
            const obj = {};

            for (const key in item) {
                const val = item[key];

                if (typeof val === "number") {
                    obj[key] = val * val;
                } else if (typeof val === "string") {
                    obj[key] = "super " + val;
                } else {
                    obj[key] = val;
                }
            }

            result.push(obj);
        } else {
            result.push(item);
        }
    }

    return result;
}

function deepClone(val) {
    if (Array.isArray(val)) {
        return val.map(deepClone);
    }

    if (val && typeof val === "object") {
        const clone = {};

        for (const key in val) {
            clone[key] = deepClone(val[key]);
        }

        return clone;
    }

    return val;
}

module.exports = { sortArray, activateArray };
