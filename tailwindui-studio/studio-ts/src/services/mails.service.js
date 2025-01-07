import { BASE_URL, CallApi } from "../utils/CallApi";

// POST
export async function sendMail(mail) {
  const url = `${BASE_URL}/mail`;
  const response = await CallApi("POST", url, mail);
  return response;
}
