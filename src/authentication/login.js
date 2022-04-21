import login, { forgotPassword, passwordReset } from '../api/authentication';
import strings from '../strings/strings';

const loginUser = async (phone, password) => {
  const response = await login(phone, password);
  console.log('The response here is', response.response.data);

  return response.status === 200
    ? `${strings.con.en} ${strings.welcome.en}${strings.selectOption.en}\n
    1. ${strings.okoa.en}\n
    2. ${strings.changisha.en}\n
    3. ${strings.pataVoucher.en}\n
    ${strings.footer.en}`
    : `${strings.end.en} ${response.response.data.error.message}`;
};

export const resetPassword = async (type, phone) => {
  const response = await forgotPassword(type, phone);
  return response.status === 200 ? `${strings.con.en} ${strings.askForOTP.en}` : `${strings.end.en}  ${strings.resetFailed.en}`;
};

export const confirmPasswordReset = async (payload) => {
  const response = await passwordReset(payload);
  return response.status === 200 ? `${strings.con.en} ${strings.resetSuccess.en}\n ${strings.footer.en}` : `${strings.end.en} ${strings.resetFailed.en}`;
};

export default loginUser;
