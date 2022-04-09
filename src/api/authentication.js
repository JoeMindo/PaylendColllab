import axios from "axios";
import { BASEURL, clientSecret } from "./urls.js";

/**
 * It takes a phone number and password, and returns a response from the server
 * @param phone - The phone number of the user
 * @param password - The password of the user.
 * @returns The response from the server.
 */
const login = async (phone, password) => {
  //let cSecret = "1df08160-1f6f-4e5e-bcce-c0d4188fef49";
  let response;
  let payload = {
    login_type: "phone",
    phone,
    password,
  };
  try {
    response = await axios.post(
      `${BASEURL}/auth/signin?${clientSecret}`,
      payload
    );
  } catch (err) {
    response = err.response.data.message;
  }
  return response;
};

export default login;
