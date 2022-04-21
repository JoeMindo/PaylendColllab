const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validateTextIsLettersOnly = (text) => {
  const regex = /^[a-zA-Z]+$/;
  return regex.test(text);
};

console.log(validateTextIsLettersOnly('12joe'));
export default validateEmail;
