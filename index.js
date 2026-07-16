import Server from "./src/server/config.js";

const server = new Server();

if (process.env.NODE_ENV !== "production") {
  server.listen();
}

export default server.app;