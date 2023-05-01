require("dotenv").config({ path: "./.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const addCustomer = async (req) => {
  console.log("req > ",req)
  console.log("req body > ",req?.body)
  const customer = await stripe.customers.create({
    name: req?.body?.name,
    email: req?.body?.email,
    metadata: req?.body?.metadata,
    description:
      "My First Test Customer (created for API docs at https://www.stripe.com/docs/api)",
  });
  return customer;
};

const retrieveCustomer = async ({ customerId }) => {
  if (!customerId) return { devMessage: "Invaild customerId" };

  const customer = await stripe.customers.retrieve(customerId);

  return customer;
};

const searchCustomer = async ({ query }) => {
  const customer = await stripe.customers.search({
    query: query,
  });

  return customer;
};

module.exports = {
  addCustomer,
  retrieveCustomer,
  searchCustomer,
};
