import express, { json } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import routers from "./api/routes";
import DataService from "./utils/DataService";

DataService.checkConnection();
const app = express();
import "./test";

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization, Origin, X-Requested-With, Accept"],
  })
);
app.use(json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(routers);
export default app;


