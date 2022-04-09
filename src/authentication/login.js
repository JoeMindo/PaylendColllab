import login from "../api/authentication.js";
import { strings } from "../strings/strings.js";

const loginUser = async (phone, password) => {
  let response = await login(phone, password);
  console.log("The response is", response);
  return response.status === 200
    ? `${strings.con.en}${strings.welcome.en}${strings.selectOption.en}\n
    1. ${strings.okoa.en}\n
    2. ${strings.changisha.en}\n
    3. ${strings.pataVoucher.en}\n
    ${strings.footer.en}`
    : `${strings.loginFailed.en}`;
};

export default loginUser;
