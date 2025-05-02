"use strict";

const assert = require("assert");
//const { Word } = require("./word");
const {
    getAllWordsFromLanguage,
    getConjunctions,
    averageLength,
    getWordsSorted,
    getTranslations,
    getLongWordDefinitions,
} = require("./dictionary");

const { words } = require("./example");

// Test: getAllWordsFromLanguage
{
    const allWords = getAllWordsFromLanguage(words, "English");
    const result = allWords.map((w) => w.literal).join(" ");

    assert.strictEqual(result, "hello be but computer");
    console.log("✅ getAllWordsFromLanguage passed");
}

// Test: getConjunctions
{
    const conjunctions = getConjunctions(words, 3);
    const result = conjunctions.map((w) => w.literal).join(" ");

    assert.ok(["but mais", "mais but"].includes(result));
    console.log("✅ getConjunctions passed");
}

// Test: averageLength
{
    const avg = averageLength(words);

    assert.strictEqual(avg, 5);
    console.log("✅ averageLength passed");
}

// Test: getWordsSorted
{
    const sorted = getWordsSorted(words)
        .map((w) => w.literal)
        .join(" ");
    const expected = "be bonjour but computer drewno être hello hola mais";

    assert.strictEqual(sorted, expected);
    console.log("✅ getWordsSorted passed");
}

// Test: getTranslations
{
    const translations = getTranslations(words, "hello");
    const result = translations.map((w) => w.translation).join(" ");

    assert.strictEqual(result, "hello bonjour hola");
    console.log("✅ getTranslations passed");
}

// Test: getLongWordDefinitions
{
    const longDefs = getLongWordDefinitions(words, 5);
    const result = longDefs.map((obj) => obj.word).join(" ");
    const expected = "computer bonjour drewno hello";

    assert.strictEqual(result, expected);
    console.log("✅ getLongWordDefinitions passed");
}

console.log("🎉 All tests passed!");
