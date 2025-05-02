"use strict";

class Word {
    // Properties preceded by a `#` symbol are private properties.
    #language;
    #literal;
    #partOfSpeech;
    #definition;
    #englishTranslation;

    constructor(
        language,
        literal,
        partOfSpeech,
        definition,
        englishTranslation = null,
    ) {
        this.#language = language;
        this.#literal = literal;
        this.#partOfSpeech = partOfSpeech;
        this.#definition = definition;
        this.#englishTranslation = englishTranslation;
    }

    get language() {
        return this.#language;
    }

    get literal() {
        return this.#literal;
    }

    get partOfSpeech() {
        return this.#partOfSpeech;
    }

    get definition() {
        return this.#definition;
    }

    get englishTranslation() {
        return this.#englishTranslation;
    }
}

module.exports = {
    Word,
};
