import { } from "dotenv/config.js";
import cors from "cors";
import { db_connection } from "./DataBase/DB.js";
import express from 'express'
import { RouterPage } from "./Routers/RouterPage.js";

const app = express();
db_connection();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use('/', RouterPage);

const PORT = process.env.PORT;
app.listen(PORT, () => { console.log("Server connected", PORT) })

