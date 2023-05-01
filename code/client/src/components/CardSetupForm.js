import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import SignupComplete from "./SignupComplete";

import { createAccount } from '../Services/account'

const CardSetupForm = (props) => {
  const {
    selected,
    mode,
    details,
    customerId,
    learnerEmail,
    learnerName,
    onSuccessfulConfirmation,
  } = props;
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [last4, setLast4] = useState("");
  // TODO: Integrate Stripe

  const handleClick = async (e) => {
    // TODO: Integrate Stripe
    const card = await createAccount(customerId, setLast4);
    setPaymentSucceeded(true);
  };

  if (selected === -1) return null;
  if (paymentSucceeded)
    return (
      <div className={`lesson-form`}>
        <SignupComplete
          active={paymentSucceeded}
          email={learnerEmail}
          last4={last4}
          customer_id={customerId}
        />
      </div>
    );
  return (
    // The actual checkout form, inside the !paymentSucceeded clause
    <div className={`lesson-form`}>
      <div className={`lesson-desc`}>
        <h3>Registration details</h3>
        <div id="summary-table" className="lesson-info">
          {details}
        </div>
        <div className="lesson-legal-info">
          Your card will not be charged. By registering, you hold a session slot
          which we will confirm within 24 hrs.
        </div>
        <div className="lesson-grid">
          <div className="lesson-inputs">
            <div className="lesson-input-box first">
              <span>
                {learnerName} ({learnerEmail})
              </span>
            </div>
            <div className="lesson-payment-element">
              {
                // TODO: Integrate Stripe
              }
            </div>
          </div>
          <button
            id="checkout-btn"
            onClick={handleClick}
          >
            <span id="button-text">Checkout</span>
          </button>
        </div>
        {error && (
          <div className="sr-field-error" id="card-errors" role="alert">
            <div className="card-error" role="alert">
              {error}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CardSetupForm;
