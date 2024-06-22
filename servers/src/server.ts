
import color from "ansi-colors";
import app from "./app";
import "./config/setup";
import getIPAddresses from "./config/IP";
import startSocketServer from "./utils/socket.io";
const IP = getIPAddresses.IP();
const PORT: number = 5001;
const PORTSOCKET: number = 5006;
const host: string = "0.0.0.0";
const server = app.listen(PORT, host, () => {
  console.log(`\n  🚀  ➜ Local:    `, color.blue(`http://localhost:${PORT}`));
  console.log(`  🚀  ➜ Network:  `, color.green(`http://${IP}:${PORT}\n`));
});
server.on("error", (error: any) => {
  console.error(`Error: ${error}`);
});
startSocketServer(PORTSOCKET);