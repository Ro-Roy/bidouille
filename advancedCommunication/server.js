const WebSocket = require("ws");
const url = require("url");

function startServer() {
    let idCounter = 1;
    const clients = [];
    const wss = new WebSocket.Server({ port: 8080 }, () => {
        console.log("Websocket server is running on port 8080.");
    });

    wss.on("connection", (ws, request) => {
        const id = idCounter++;
        const { query } = url.parse(request.url, true);
        const userName = query.username;

        ws.on("message", (message) => {
            console.log(`[${id}] ${message}`);
        });

        ws.on("close", (code, reason) => {
            console.log(`[${id}] Disconnected: [${code}] ${reason}`);
            const idx = clients.findIndex((c) => c.ws === ws);

            if (idx !== -1) {
                clients.splice(idx, 1);
                clients.forEach((c) => c.ws.send(`${userName} disconnected`));
            }
        });

        if (clients.some((c) => c.userName === userName)) {
            ws.close(1008, `Username: "${userName}" is already taken`);
            return;
        }

        clients.push({ ws, userName, id });
        ws.send(`Welcome ${userName}`);

        const total = clients.length;

        if (total === 1) {
            ws.send(`${userName}, you are the only player connected`);
        } else {
            ws.send(`${total} players are connected`);
        }

        clients.forEach((c) => {
            if (c.ws !== ws) {
                c.ws.send(`${userName} connected`);
            }
        });

        if (total < 4) {
            clients.forEach((c) =>
                c.ws.send(
                    `Waiting for ${4 - total} other players to start the game`,
                ),
            );
        }

        if (total === 4) {
            clients.forEach((c) => {
                c.ws.send(
                    `Match will start soon, disconnecting ${c.userName} from the lobby`,
                );
                c.ws.close(1000, "Match is starting");
            });
        }
    });

    return wss;
}

module.exports = { startServer };
