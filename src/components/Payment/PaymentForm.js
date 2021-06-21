import React, { useContext, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useHistory } from "react-router";
import { UserContext } from "../../App";

const PaymentForm = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [info, setInfo] = useState({});
  const history = useHistory();
  // const [file, setFile] = useState(null);

  const handleBlur = (e) => {
    const newInfo = { ...info };
    newInfo[e.target.name] = e.target.value;
    setInfo(newInfo);
    console.log(newInfo);
  };
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();
    const formData = new FormData();

    // formData.append("file", file);
    formData.append("name", loggedInUser.name);
    formData.append("email", loggedInUser.email);
    formData.append("package", info.package);

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
      alert("[error]", error);
    } else {
      fetch("https://rocky-river-97926.herokuapp.com/addEmployer", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          alert("New Employer Registered Successfully");
        })
        .catch((error) => {
          console.error(error);
        });
      console.log("[PaymentMethod]", paymentMethod);
      history.push(`/dashboard`);
    }
  };

  return (
    <center>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <div class="form-check">
          <input
            onBlur={handleBlur}
            class="form-check-input"
            type="radio"
            name="package"
            id="exampleRadios1"
            value="basic"
          />
          <label class="form-check-label" for="exampleRadios1">
            Basic Package
          </label>
        </div>
        <div class="form-check">
          <input
            onBlur={handleBlur}
            class="form-check-input"
            type="radio"
            name="package"
            id="exampleRadios2"
            value="standard"
          />
          <label class="form-check-label" for="exampleRadios2">
            Standard
          </label>
        </div>
        <div class="form-check disabled">
          <input
            onBlur={handleBlur}
            class="form-check-input"
            type="radio"
            name="package"
            id="exampleRadios3"
            value="premium"
          />
          <label class="form-check-label" for="exampleRadios3">
            Premium
          </label>
        </div>

        <br />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    </center>
  );
};

export default PaymentForm;
