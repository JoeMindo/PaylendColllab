const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

export const validateTextIsLettersOnly = (text) => {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(text);
};


export default validateEmail;
