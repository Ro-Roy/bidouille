const { addClient } = require("./client");
const { startServer } = require("./server");

if (process.argv[2] === "server") {
    startServer();
} else {
    addClient(process.argv[2]);
}
