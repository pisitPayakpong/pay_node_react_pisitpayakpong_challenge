import axios from "axios";
import { getDataFromResp } from "../utils";

export const checkExistingCustomerProfile = async ({
  learnerName,
  learnerEmail,
  setExistingCustomer,
  setCustomerId,
  setClientSecret
}) => {
  const apiUrl = `http://localhost:4242/customers/search?query=email: '${learnerEmail}' AND name: '${learnerName}'`;
  try {
    const resp = await axios.get(`${apiUrl}`);
    const customer = getDataFromResp(resp)?.data?.[0];
    if (customer) {
      const { id, name, email, default_source } = customer;
      setExistingCustomer({
        customerId: id,
        customerName: name,
        customerEmail: email,
        defaultCardId: default_source
      });
      setCustomerId(id);
    } else {
      // navigate to create user
      console.log("Navigate to Reigster");
      setClientSecret("NewCustomer")
    }
  } catch (error) {
    console.log("error : ", error);
  }
};
