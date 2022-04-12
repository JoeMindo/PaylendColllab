import axios from 'axios';
import { BASEURL, clientSecret } from './urls';

/**
 * It takes a phone number and password, and returns a response from the server
 * @param phone - The phone number of the user
 * @param password - The password of the user.
 * @returns The response from the server.
 */
const login = async (phone, password) => {
  let response;
  const payload = {
    login_type: 'phone',
    phone,
    password,
  };
  try {
    response = await axios.post(
      `${BASEURL}/auth/signin?${clientSecret}`,
      payload,
    );
  } catch (err) {
    return err;
  }
  return response;
};

export const forgotPassword = async (type, phone) => {
  let response;
  const payload = {
    type,
    phone,
  };
  try {
    response = await axios.post(`${BASEURL}/v2/auth/forgot-password?${clientSecret}`, payload);
    return response;
  } catch (err) {
    return err;
  }
};
export default login;
