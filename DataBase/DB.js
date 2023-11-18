import mongoose from "mongoose";
import { } from "dotenv/config.js";

export const db_connection = async () => {
    await mongoose

        .connect(process.env.DB_URL)
        .then(() => console.log("DB_connected"))
        .catch((e) => console.log("DB_not_connected", e));

}