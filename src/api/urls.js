import "dotenv/config";
export const BASEURL = "https://api.paylend.africa/v2";
export const clientSecret = `client_secret=${process.env.CLIENT_SECRET}`;

console.log(clientSecret);
