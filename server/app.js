const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { getOAuth } = require("./opera");
const { default: axios } = require("axios");
const app = express();

const winston = require('winston');

let logger = winston.createLogger({
  transports: [
    new (winston.transports.File)({ filename: 'app.log', level: 'info', timestamp: true })
  ],
  exitOnError: false, // do not exit on handled exceptions
});

app.use(cors());
app.use(bodyParser.json());
const BaseUrl =
  "https://ocr2-demo-oc.hospitality-api.us-ashburn-1.ocs.oc-test.com";

const operaAxios = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json",
    "x-app-key": "abf0b0f6-0dad-46a3-b7ea-f467c53b09b9",
    "x-hotelid": "SAND01",
  },
});

operaAxios.interceptors.request.use(req => {
  logger.info(`${JSON.stringify(req, null, 2)}`);
  // you must return the request object after you are done
  return req;
});

operaAxios.interceptors.response.use(res => {
  logger.info(res.data);
  // you must return the response object after you are done
  return res;
});


app.post("/getToken", async (req, res) => {
  try {
    const token = await getOAuth();
    return res.json({ token });
  } catch (e) {
    res.status(404);
    return res.json({ error: e });
  }
});

app.use(function (req, res, next) {
  if (!req.headers?.authorization) {
    res.status(403);
    return res.json({ error: "unauthorize" });
  }
  operaAxios.defaults.headers.common["Authorization"] =
    req.headers.authorization;

  next();
});

app.get("*", async (req, res) => {
  try {
    const response = await operaAxios.get(req.url);
    const data = await response.data;
    return res.json({ data });
  } catch (e) {
    res.status(404);
    return res.json({ error: e });
  }
});

app.post("*", async (req, res) => {
  try {
    const response = await operaAxios.post(req.url, req.body);
    const data = await response.data;
    return res.json({ data });
  } catch (e) {
    res.status(404);
    return res.json({ error: e });
  }
});

module.exports = app;
