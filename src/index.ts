import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import http from "http";
import { CLIENT_PORT, DOMAIN, PORT } from "../src/helpers/constants";
import router from "./router";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: `http://${DOMAIN}:${CLIENT_PORT}`,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`server running on http://${DOMAIN}:/${PORT}`);
});

app.use("/", router());
