import express from "express";
import { routers } from "./src/routes/index.js";
import "./src/service/cron.service.js"
import "dotenv/config";
const app = express();

app.use(express.json());
app.use(routers);

const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`Servidor rodando na porta: ${port}`)});