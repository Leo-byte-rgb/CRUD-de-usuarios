import dotenv from "dotenv";
dotenv.config();

import express from "express";
import "./src/database";
import userRoutes from "./src/routes/user";
import tokenRoutes from "./src/routes/token";

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Authorization"
      );
      next();
    });
  }
  routes() {
    this.app.use("/users", userRoutes);
    this.app.use("/tokens/", tokenRoutes);
  }
}

export default new App().app;
