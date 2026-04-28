import express from "express";
import cors from "cors";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import indexRoutes from "../routes/index.routes.js";

dotenv.config();

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(morgan("dev"));

    const __dirname = dirname(fileURLToPath(import.meta.url));
    this.app.use(express.static(__dirname + "/../../public"));
  }

  routes() {
    this.app.use("/api", indexRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.info(`El servidor se esta ejecutando en http://localhost:${this.port}`);
    });
  }
}
