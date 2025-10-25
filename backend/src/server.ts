import { config } from "dotenv";

import server from "./app";
import { initDb } from "./database/mongodb";

// async function main() {
const PORT = +(process.env.PORT || 3000);

config({
  path: ".env.dev",
});

initDb();

server.listen(PORT, () => {
  console.log(`Listening to port ${PORT}...`);
});
// }

// main();

export const viteNodeApp = server;
