import axios from "axios";
const apiUrl = `http://localhost:4242`;
export const accountUpdate = async (customerId, cardId) => {
  console.log("customerId > ",customerId);
  console.log("cardId > ",cardId);
  const response = await axios.get(`${apiUrl}/customers/${customerId}/source/${cardId}`);

  if (!response.data) {
    console.log("Account Update: Error happened while fetching data");
    return null;
  }
  return response?.data;
};