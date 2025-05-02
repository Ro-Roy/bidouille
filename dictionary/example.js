"use strict";

const { Word } = require("./word");

const words = [
    new Word(
        "English",
        "hello",
        "noun",
        "An expression or gesture of greeting —used interjectionally in greeting, in answering the telephone, or to express surprise.",
        null,
    ),
    new Word(
        "French",
        "bonjour",
        "noun",
        "Souhait de bonne journée (adressé en arrivant, en rencontrant).",
        "hello",
    ),
    new Word(
        "Spanish",
        "hola",
        "noun",
        "Expresión con que se saluda.",
        "hello",
    ),
    new Word("English", "be", "verb", "To exist.", null),
    new Word("French", "être", "verb", "Exister.", "be"),
    new Word(
        "English",
        "but",
        "conjunction",
        "Used to introduce a phrase or clause contrasting with what has already been mentioned.",
        null,
    ),
    new Word(
        "French",
        "mais",
        "conjunction",
        "Indique une opposition, une précision, une correction par rapport à ce qui a été énoncé.",
        "but",
    ),
    new Word(
        "English",
        "computer",
        "noun",
        "A programmable electronic device that performs mathematical calculations and logical operations",
        null,
    ),
    new Word(
        "Polish",
        "drewno",
        "noun",
        "Materiał uzyskiwany z gałęzi i pni drzew używany w budownictwie.",
        null,
    ),
];

module.exports = { words };
