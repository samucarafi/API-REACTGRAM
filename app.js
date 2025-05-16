import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

// Recriar __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT;

const app = express();

//config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Solve CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//Upload directiory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//DB connection
import "./config/db.js";

//routes
import router from "./routes/Router.js";
app.use(router);

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
