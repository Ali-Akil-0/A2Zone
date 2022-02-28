import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useStateValue } from "../StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import {
  useStripe,
  useElements,
  CardElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { ElementsConsumer } from "@stripe/react-stripe-js";
import "./Payment.css";
import { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../reducer";
import { useEffect } from "react";
import axios from "../axios";
import { Elements } from "@stripe/react-stripe-js";
import { database, db } from "../firebase";
import { connectDatabaseEmulator, Database, ref, set } from "firebase/database";

const Payment = () => {
  //   const ref = Database.database(
  //     "https://a2zone-default-rtdb.europe-west1.firebasedatabase.app"
  //   );
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [disabled, setDisable] = useState(true);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);

  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState(false);
  useEffect(
    (options = { clientSecret }) => {
      if (orders === true) {
        navigate("/orders", { replace: true });
      }
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
    },
    [basket, orders]
  );
  if (clientSecret !== true) {
    console.log("The client secret is : ", clientSecret);
  }

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    setProcessing(true);

    stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        const something = async () => {
          try {
            const docRef = await addDoc(collection(db, "users"), {
              basket: basket,
              amount: paymentIntent.amount,
              craeted: paymentIntent.created,
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        };
        something();
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        setOrders(true);
        console.log("when ?", user?.uid);
      });
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
                <button
                  type="submit"
                  disabled={processing || disabled || succeeded}
                >
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
