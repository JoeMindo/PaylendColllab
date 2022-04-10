import login from '../api/authentication';
import strings from '../strings/strings';

const loginUser = async (phone, password) => {
  const response = await login(phone, password);
  return response.status === 200
    ? `${strings.con.en} ${strings.welcome.en}${strings.selectOption.en}\n
    1. ${strings.okoa.en}\n
    2. ${strings.changisha.en}\n
    3. ${strings.pataVoucher.en}\n
    ${strings.footer.en}`
    : `${strings.end.en}${strings.loginFailed.en}`;
};

export default loginUser;
