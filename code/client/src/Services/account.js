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

export const createAccount = async (customerId, setLast4) => {
  const response = await axios.post(`${apiUrl}/customers/${customerId}/source`);

  console.log("response > ",response);
  if (!response.data) {
    console.log("Account Update: Error happened while fetching data");
    return null;
  }
  setLast4(response.data?.last4);
  return response?.data;
};