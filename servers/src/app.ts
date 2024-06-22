import express, { json } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import routers from "./routes";
import "./test";
const app = express();
app.use(cors());
app.use(json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(routers);

export default app;
