import strings from '../strings/strings';
import { registerUser } from '../api/authentication';
import { registrationFailed, renderMainMenus } from '../helpers/getSpecificMenu';

const registerUserMenus = async (textLength, text, phone) => {
  let message;
  switch (textLength) {
    case 1:
      message = `${strings.con.en} ${strings.welcome.en} ${strings.firstName.en}`;
      break;
    case 2:
      message = `${strings.con.en} ${strings.lastName.en}`;
      break;
    case 3:
      message = `${strings.con.en} ${strings.email.en}`;
      break;
    case 4:
      message = `${strings.con.en} ${strings.country.en}`;
      break;
    case 5:
      message = `${strings.con.en} ${strings.askForNewPassword.en}`;
      break;
    case 6:
      message = `${strings.con.en} ${strings.confirmNewPassword.en}`;
      break;
    case 7:
      message = `${strings.con.en} ${strings.confirmDetails.en}`;
      break;
    case 8: {
      const userResponses = text.split('*');
      const userdetails = {
        firstname: userResponses[0],
        lastName: userResponses[1],
        phone,
        email: userResponses[2],
        country: userResponses[3],
        password: userResponses[4],
        confirmNewPassword: userResponses[5],

      };
      const response = await registerUser(userdetails);
      if (response.status === 200) {
        message = renderMainMenus();
      } else {
        registrationFailed();
      }

      break;
    }
    default: {
      message = `${strings.con.en} ${strings.invalidInput.en}`;
    }
  }
  return message;
};

export default registerUserMenus;
