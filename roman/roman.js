function toRoman(number) {
    if (typeof number !== "number" || number < 1 || number > 3999) {
        return "Error";
    }

    const values = [
        { val: 1000, sym: "M" },
        { val: 900, sym: "CM" },
        { val: 500, sym: "D" },
        { val: 400, sym: "CD" },
        { val: 100, sym: "C" },
        { val: 90, sym: "XC" },
        { val: 50, sym: "L" },
        { val: 40, sym: "XL" },
        { val: 10, sym: "X" },
        { val: 9, sym: "IX" },
        { val: 5, sym: "V" },
        { val: 4, sym: "IV" },
        { val: 1, sym: "I" },
    ];

    let result = "";

    for (const { val, sym } of values) {
        while (number >= val) {
            result += sym;
            number -= val;
        }
    }

    return result;
}

function fromRoman(romanString) {
    if (typeof romanString !== "string") {
        return -1;
    }

    const values = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
    };

    let total = 0;
    let prev = 0;
    let count = 0;

    for (let i = romanString.length - 1; i >= 0; i--) {
        const char = romanString[i];
        const value = values[char];

        if (!value) {
            return -1;
        }

        if (value < prev) {
            total -= value;
            count = 0;
        } else {
            if (value === prev) {
                count++;
            } else {
                count = 1;
            }

            if (count > 3) {
                return -1;
            }

            total += value;
            prev = value;
        }
    }

    const rebuilt = toRoman(total);

    if (rebuilt !== romanString) {
        return -1;
    }

    return total;
}

module.exports = { toRoman, fromRoman };
