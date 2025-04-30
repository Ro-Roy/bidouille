const WebSocket = require("ws");

function addClient(userName) {
    const ws = new WebSocket(
        `ws://localhost:8080?username=${encodeURIComponent(userName)}`,
    );

    ws.on("open", () => {
        ws.send(`${userName}: trying to establish connection`);
    });
    ws.on("message", (message) => {
        console.log(`<server to ${userName}>: ${message}`);
    });
    ws.on("close", (code, reason) => {
        console.log(
            `<server to ${userName}>: Connection has been closed: [${code}] ${reason}`,
        );
    });
    return ws;
}

module.exports = { addClient };
