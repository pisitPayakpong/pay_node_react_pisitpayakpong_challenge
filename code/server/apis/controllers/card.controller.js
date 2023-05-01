require("dotenv").config({ path: "./.env" });
const { map } = require("lodash");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const DEFAULT_CARD_LIMIT = 3;

const getCards = async (req) => {
  const customerId = req?.params?.customerId;
  const limit = req?.params?.limit ? req?.params?.limit : DEFAULT_CARD_LIMIT;
  if (!customerId) {
    return { devMessage: "Invaild customerId" };
  }

  const customer = await stripe.customers.retrieve(customerId);
  if (!customer) {
    return { devMessage: "Invaild customerId" };
  }

  const card = await stripe.customers.listSources(customerId, {
    object: "card",
    limit,
  });

  const newData = map(card?.data, (d) => {
    return { card: d, customer };
  });

  return { ...newData };
};

const addCardToCustomer = async (req) => {
  const customerId = req?.params?.customerId;
  if (!customerId) {
    return { devMessage: "Invaild customerId" };
  }

  const customer = await stripe.customers.retrieve(customerId);
  if (!customer) {
    return { devMessage: "Invaild customerId" };
  }

  const card = await stripe.customers.createSource(customerId, {
    source: "tok_mastercard",
  });
  return card;
};

const retrieveCard = async (req) => {
  const customerId = req?.params?.customerId;
  const cardId = req?.params?.cardId;
  try {
    if (!customerId && !cardId) {
      return { devMessage: "Invaild customerId and cardId" };
    }
    const customer = await stripe.customers.retrieve(customerId);
    if (!customer) {
      return { devMessage: "Invaild customerId" };
    }

    const card = await stripe.customers.retrieveSource(customerId, cardId);

    return { card, customer };
  } catch (error) {
    return error;
  }
};

module.exports = {
  addCardToCustomer,
  retrieveCard,
  getCards,
};
