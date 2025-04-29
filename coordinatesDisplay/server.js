// svg image server
const express = require("express");
const cors = require("cors");
const DOMParser = require("xmldom").DOMParser;
const XMLSerializer = require("xmldom").XMLSerializer;
const fs = require("fs");

const app = express();

app.use(cors());

app.use(express.static("public"));

app.listen(2707, () => {
    console.log("Server listening on port 2707 👂");
});

const sidePiecesCount = 20; // size has to odd to make the puzzle solvable

app.get("/mapWidth", (req, res) => {
    res.json(sidePiecesCount);
});

const parser = new DOMParser();

const svgText = fs.readFileSync(__dirname + "/resources/logo.svg", "utf8");
const svg = parser.parseFromString(svgText, "image/svg+xml");

const width = svg.documentElement.getAttribute("width");
const height = svg.documentElement.getAttribute("height");

const gridSideSize = Math.max(width, height);

const pieceSize = gridSideSize / sidePiecesCount;

const piecesMap = new Array(sidePiecesCount * sidePiecesCount);

for (let x = 0; x < sidePiecesCount; x++) {
    for (let y = 0; y < sidePiecesCount; y++) {
        const piece = svg.cloneNode(true);

        piece.documentElement.setAttribute(
            "viewBox",
            `${x * pieceSize} ${y * pieceSize} ${pieceSize} ${pieceSize}`,
        ); // ATTENTION : this method is really slow, in real life cases you should really cut the image and not send it with information on where to crop it
        piece.documentElement.setAttribute("width", `${pieceSize}`);
        piece.documentElement.setAttribute("height", `${pieceSize}`);
        const svgString = new XMLSerializer().serializeToString(piece);

        piecesMap[x + y * sidePiecesCount] = {
            svg: svgString,
            x: x,
            y: y,
        };
    }
}

const shuffledCoordinates = Array.from(
    Array(sidePiecesCount * sidePiecesCount).keys(),
);

const swap = (a, i, j) => {
    const tmp = a[i];

    a[i] = a[j];
    a[j] = tmp;
};

const shuffle = (a) => {
    let i = a.length - 1;

    while (i > 0) {
        const j = Math.floor(Math.random() * i);

        swap(a, i, j);
        i--;
    }
};

shuffle(shuffledCoordinates);

console.log("Coordinates shuffled ! 🥳");
console.log("now serving on port 2707. 🫡");

for (let x = 0; x < shuffledCoordinates.length; x++) {
    app.get(`/piece/${x}`, (req, res) => {
        console.log(`piece ${x} requested 🤖`);
        res.send(piecesMap[shuffledCoordinates[x]]);
    });
}

exports.app = app;
