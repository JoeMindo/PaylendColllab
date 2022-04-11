import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { getText, getTextLength } from './src/helpers/stringmanipulation';
import strings from './src/strings/strings';
import loginUser from './src/authentication/login';

const app = express();
const port = 3000;

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.set('trust proxy', 1);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, POST, GET, PATCH, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.post('/ussd', async (req, res) => {
  const { text } = req.body;
  const phone = req.body.phoneNumber;
  let message;

  const textLength = getTextLength(text);
  if (textLength === 1 && text === '') {
    message = `${strings.con.en} ${strings.welcome.en}${strings.login.en}\n1. ${strings.resetPin.en}\n`;
  } else if (textLength === 1 && text !== '') {
    const password = getText(text, 0);
    message = await loginUser(phone, password);
  }
  res.send(message);
});

app.listen(process.env.PORT || port, () => {
  // console.log(`Example app listening on port ${port}!`);
});
