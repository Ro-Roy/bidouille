"use strict";

function getAllWordsFromLanguage(words, language) {
    return words.filter((w) => w.language === language);
}

function getConjunctions(words, count) {
    return words
        .filter((w) => w.partOfSpeech === "conjunction")
        .slice(0, count);
}

function averageLength(words) {
    if (words.length === 0) {
        return null;
    }

    const totalLength = words
        .map((w) => w.literal.length)
        .reduce((a, b) => a + b, 0);

    return Math.round(totalLength / words.length);
}

function getWordsSorted(words) {
    return [...words].sort((a, b) => a.literal.localeCompare(b.literal));
}

function getTranslations(words, word) {
    const matches = words.filter(
        (w) => w.literal === word || w.englishTranslation === word,
    );

    if (matches.length === 0) {
        return null;
    }

    const translations = matches.map((w) => ({
        language: w.language,
        translation: w.literal,
    }));

    return translations.sort((a, b) => a.language.localeCompare(b.language));
}

function getLongWordDefinitions(words, threshold) {
    return words
        .filter((w) => w.literal.length >= threshold)
        .map((w) => ({
            length: w.literal.length,
            word: w.literal,
            language: w.language,
            definition: w.definition,
        }))
        .sort((a, b) => {
            if (b.length !== a.length) {
                return b.length - a.length;
            }

            return a.word.localeCompare(b.word, "en", { sensitivity: "base" });
        });
}

module.exports = {
    getAllWordsFromLanguage,
    getConjunctions,
    averageLength,
    getWordsSorted,
    getTranslations,
    getLongWordDefinitions,
};
