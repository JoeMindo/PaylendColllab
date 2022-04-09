import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import logger from "morgan";

import { getText, getTextLength } from "./src/helpers/stringmanipulation.js";
import { strings } from "./src/strings/strings.js";
import loginUser from "./src/authentication/login.js";
let app = express();
let port = 3000;

app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.set("trust proxy", 1);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, POST, GET, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.post("/ussd", async (req, res) => {
  console.log("The request is", req.body);
  let text = req.body.text;
  let phone = req.body.phoneNumber;
  let message;

  let textLength = getTextLength(text);
  if (textLength === 1 && text === "") {
    message = `${strings.con.en} ${strings.welcome.en}${strings.login.en}\n1. ${strings.resetPin.en}\n`;
  } else {
    if (textLength === 1 && text !== "") {
      let password = getText(text, 0);
      message = await loginUser(phone, password);
    }
  }
  res.send(message);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
