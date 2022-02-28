import React from "react";
import "./Order.css";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";

const Order = ({ order }) => {
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("LLLL")}</p>
      <p className="order__id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item) => (
        <CheckoutProduct
          id={item.id}
          title={item.title}
          price={item.price}
          rating={item.rating}
          image={item.image}
          hideButton={true}
        />
      ))}
      <div className="order__total">
        <CurrencyFormat
          value={order.data.amount / 100}
          decimalScale={2}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
          renderText={(value) => (
            <>
              <h3>
                Order total <strong> {value} </strong>
              </h3>
            </>
          )}
        />
      </div>
    </div>
  );
};

export default Order;
