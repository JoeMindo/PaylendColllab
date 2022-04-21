import strings from '../strings/strings';
import {registerUser, getToken} from '../api/authentication';
import {askToConfirmOTP, registrationFailed, renderMainMenus, verificationFailed} from '../helpers/getSpecificMenu';
import validateEmail, {validateTextIsLettersOnly} from '../helpers/validation';
import {getText} from '../helpers/stringmanipulation';

const registerUserMenus = async (textLength, text, phone) => {
    let message;
    const length = textLength;
    const firstName = text.split('*')[0];
    const lastName = text.split('*')[1];
    const email = text.split('*')[2];
    const country = text.split('*')[3];

    switch (true) {
        case(length === 1 && text === ''): message = `${
                strings.con.en
            } ${
                strings.welcome.en
            } ${
                strings.firstName.en
            }`;
            break;
        case(length === 1 && text !== '' && validateTextIsLettersOnly(firstName)): message = `${
                strings.con.en
            } ${
                strings.lastName.en
            }`;
            break;
        case(length === 2 && validateTextIsLettersOnly(lastName)): message = `${
                strings.con.en
            } ${
                strings.email.en
            }`;
            break;
        case(length === 3 && validateEmail(email)): message = `${
                strings.con.en
            } ${
                strings.country.en
            }`;
            break;
        case(length === 4 && validateTextIsLettersOnly(country)): message = `${
                strings.con.en
            } ${
                strings.askForNewPassword.en
            }`;
            break;
        case(length === 5): message = `${
                strings.con.en
            } ${
                strings.confirmNewPassword.en
            }`;
            break;
        case(length === 6): message = `${
                strings.con.en
            } ${
                strings.confirmDetails.en
            }`;
            break;
        case(length === 7):
            {
                const userResponses = text.split('*');
                const userdetails = {
                    firstname: userResponses[0],
                    lastname: userResponses[1],
                    phone: phone.substring(1),
                    email: userResponses[2],
                    country: userResponses[3],
                    password: userResponses[4],
                    confirm_password: userResponses[5]

                };
                const response = await registerUser(userdetails);
                if (response.status === 201) {
                    message = askToConfirmOTP();
                } else {
                    registrationFailed();
                }
                break;
            }
        case(length === 8):
            {
                const otp = getText(text, 7);
                const response = await getToken(otp);

                if (response.status === 200) {
                    message = renderMainMenus();
                } else {
                    message = verificationFailed();
                }
                break;
            }

        default:
            {
                message = `${
                    strings.con.en
                } ${
                    strings.invalidInput.en
                }`;
            }
    }
    return message;
};

export default registerUserMenus;
