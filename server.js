import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { ussdRouter } from 'ussd-router';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { getText, getTextLength } from './src/helpers/stringmanipulation';
import strings from './src/strings/strings';
import loginUser, { resetPassword, confirmPasswordReset } from './src/authentication/login';
import askUserToGiveNewPassword, { askUserToConfirmPassword } from './src/helpers/getSpecificMenu';
import { getToken } from './src/api/authentication';

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
  const rawText = req.body.text;
  const text = ussdRouter(rawText);
  const phone = req.body.phoneNumber;
  let message;

  const textLength = getTextLength(text);
  const db = new JsonDB(new Config('myDataBase', true, false, '/'));
  if (textLength === 1 && text === '') {
    message = `${strings.con.en} ${strings.welcome.en}${strings.login.en}\n1. ${strings.resetPin.en}\n`;
  } else if (textLength === 1 && text !== '' && text.length > 2) {
    const password = getText(text, 0);
    message = await loginUser(phone, password);
  } else if (textLength === 1 && getText(text, [0]) === '1') {
    const phoneNumber = phone.substring(1);
    message = await resetPassword('phone', phoneNumber);
    message += `${strings.footer.en}`;
  } else if (textLength === 2 && getText(text, [0]) === '1') {
    const token = [];
    const otp = getText(text, [1]);
    const tokenRequest = await getToken(otp);
    if (tokenRequest && tokenRequest.status === 200) {
      db.push('/token', `${tokenRequest.data.data.token}`);
    } else {
      token.push('');
    }
    message = askUserToGiveNewPassword();
  } else if (textLength === 3 && getText(text, [0]) === '1') {
    message = askUserToConfirmPassword();
  } else if (textLength === 4 && getText(text, [0]) === '1') {
    const data = db.getData('/token');
    console.log('The data here is', data);
    const resetPasswordPayload = {
      password: text.split('*')[2],
      confirm_password: text.split('*')[3],
      token: data,
    };
    message = await confirmPasswordReset(resetPasswordPayload);
  }
  res.send(message);
});

app.listen(process.env.PORT || port, () => {
  // console.log(`Example app listening on port ${port}!`);
});
