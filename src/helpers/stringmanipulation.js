/**
 * It takes a string and an index, and returns the substring of the string that is at the index
 * @param requestBody - The body of the request.
 * @param index - The index of the text you want to get.
 * @returns The text at the index of the request body.
 */
export const getText = (requestBody, index) => requestBody.split('*')[index];

/**
 * It takes a string and returns the number of words in the string
 * @param requestBody - The body of the request.
 * @returns The length of the array created by splitting the requestBody string at the asterisk
 * character.
 */
export const getTextLength = (requestBody) => requestBody.split('*').length;
