import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { ElementsConsumer } from "@stripe/react-stripe-js";
import "./Payment.css";
import { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../reducer";
import { useEffect } from "react";
import axios from "../axios";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [disabled, setDisable] = useState(true);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState();

  const [{ basket, user }, dispatch] = useStateValue();
  useEffect(() => {
    // generate stripe secret
    const getClientSecret = async () => {
      // const response = await axios();
      // stripe expects the payments is subcurrencies
      const respose = await axios({
        method: "post",
        url: `/payment/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(respose.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe
      .confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: { clientSecret },
        },
      })
      .then(({ PaymentIntent }) => {
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        Navigate.replace("/orders");
      });

    if (result.error) {
      console.log(result.error.message);
    } else {
    }
  };
  const handleChange = (e) => {
    setDisable(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          <Link to="/checkout">Checkout {basket?.length} items</Link>
        </h1>
        {/* Address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivary Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>There, Somewhere</p>
          </div>
        </div>
        {/* Item */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Item and delivary</h3>
          </div>
          <div className="payment__item">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
              />
            ))}
          </div>
        </div>
        {/* Payment */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  value={getBasketTotal(basket)}
                  decimalScale={2}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  renderText={(value) => (
                    <>
                      <p>
                        Order Total : <strong> {value} </strong>
                      </p>
                    </>
                  )}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p> Processing </p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
