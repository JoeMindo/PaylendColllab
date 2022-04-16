import strings from '../strings/strings';

const askUserToGiveNewPassword = () => `${strings.con.en} ${strings.askForNewPassword.en}`;
export const askUserToConfirmPassword = () => `${strings.con.en} ${strings.confirmNewPassword.en}`;
export const renderMainMenus = () => `${strings.con.en} ${strings.welcome.en}${strings.selectOption.en}\n
1. ${strings.okoa.en}\n
2. ${strings.changisha.en}\n
3. ${strings.pataVoucher.en}\n`;
export const registrationFailed = () => `${strings.con.en} ${strings.registrationFailed.en}`;
export default askUserToGiveNewPassword;
