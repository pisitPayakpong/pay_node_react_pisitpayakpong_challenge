import axios from "axios";
import { getDataFromResp } from "../utils";
const apiUrl = "http://localhost:4242";

export const checkExistingCustomerProfile = async ({
  learnerName,
  learnerEmail,
  setExistingCustomer,
  setCustomerId,
  setClientSecret,
  firstLessonDate,
}) => {
  try {
    const resp = await axios.get(
      `${apiUrl}/customers/search?query=email: '${learnerEmail}' AND name: '${learnerName}'`
    );
    const customer = getDataFromResp(resp)?.data?.[0];
    if (customer) {
      const { id, name, email, default_source } = customer;
      setExistingCustomer({
        customerId: id,
        customerName: name,
        customerEmail: email,
        defaultCardId: default_source,
      });
      setCustomerId(id);
    } else {
      // navigate to create user
      console.log("Navigate to Reigster");
      await createPaymentIntent(
        setClientSecret,
        setCustomerId,
        learnerName,
        learnerEmail,
        firstLessonDate
      );
    }
  } catch (error) {
    console.log("error : ", error);
  }
};

const createPaymentIntent = async (
  setClientSecret,
  setCustomerId,
  learnerName,
  learnerEmail,
  firstLessonDate
) => {
  const resp = await axios.post(`${apiUrl}/create-payment-intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  });

  const customer = await axios.post(`${apiUrl}/customers`, {
    name: learnerName,
    email: learnerEmail,
    metadata: { first_lesson: firstLessonDate },
  });

  if (!customer.data) {
    console.log("Create Account: Error happened while fetching data");
    return null;
  }

  setCustomerId(customer?.data?.id);
  setClientSecret(resp?.data?.clientSecret);
  return resp;
};
