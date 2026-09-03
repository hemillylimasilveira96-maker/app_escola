import homeRoutes from "./routes/home.js";
import alunoRoutes from "./routes/alunos.js";
import livroRoutes from "./routes/livros.js";
import express from "express";
import methodOverride from "method-override";
import { engine } from "express-handlebars";
import { resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..");

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.views();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(methodOverride("_method"));
  }

  views() {
    this.app.set("views", resolve(__dirname, "views"));
    this.app.engine(
      "handlebars",
      engine({
        defaultLayout: "main",
        layoutsDir: resolve(__dirname, "views", "layouts"),
      }),
    );
    this.app.set("view engine", "handlebars");
  }

  routes() {
    this.app.use("/", homeRoutes);
    this.app.use("/alunos", alunoRoutes);
    this.app.use("/livros", livroRoutes);
  }
}

export default new App().app;
