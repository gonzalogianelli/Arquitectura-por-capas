import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import dogRoutes from "./routes/dogRoutes.js";
import { notFoundHandler, errorHandler } from "./middlewares/errorHandler.js";

dotenv.config(); 

const app = express();

app.use(express.json());
app.use("/api/perros", dogRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB();
    app.listen(3000, () => console.log("Servidor levantado en el puerto 3000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();