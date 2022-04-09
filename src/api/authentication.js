import axios from "axios";
import { BASEURL, clientSecret } from "./urls.js";

const login = (phone, password) => {
  let response;
  let payload = {
    login_type: "phone",
    phone,
    password,
  };
  try {
    response = axios.post(`${BASEURL}/auth/login`, payload);
  } catch (err) {
    response = err.response.data.message;
  }
  return response;
};

export default login;
