/**
 * It takes a string and an index, and returns the substring of the string that is at the index
 * @param requestBody - The body of the request.
 * @param index - The index of the text you want to get.
 * @returns The text at the index of the request body.
 */
export const getText = (requestBody, index) => {
  return requestBody.split("*")[index];
};

export const getTextLength = (requestBody) => {
  return requestBody.split("*").length;
};
