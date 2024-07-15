import color from "ansi-colors";
import app from "./app";
import "./config/setup";
import getIPAddresses from "./config/IP";
import startSocketServer from "./utils/socket.io";
import portfinder from "portfinder";
import dotenv from "dotenv";
dotenv.config();
const IP = getIPAddresses.IP();
const PORTSOCKET: number = process.env.PORT_SOCKET ? parseInt(process.env.PORT_SOCKET) : 5000;
const PORSERVER: number = process.env.PORT_SERVER ? parseInt(process.env.PORT_SERVER) : 5001;
const host: string = "0.0.0.0";

// Sử dụng portfinder để tìm cổng khả dụng
portfinder
  .getPortPromise({ port: PORSERVER })
  .then((PORT: number) => {
    const server = app.listen(PORT, host, () => {
      console.log(
        `\n  🚀  ➜ Local:    `,
        color.blue(`http://localhost:${PORT}`)
      );
      console.log(`  🚀  ➜ Network:  `, color.green(`http://${IP}:${PORT}`));
    });

    server.on("error", (error: any) => {
      console.error(`Error: ${error}`);
    });

    startSocketServer(PORTSOCKET);
  })
  .catch((err) => {
    console.error(`Could not find an open port: ${err}`);
  });
