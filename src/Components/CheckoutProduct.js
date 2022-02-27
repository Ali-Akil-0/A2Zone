import React from "react";
import { useStateValue } from "../StateProvider";
import "./CheckoutProduct.css";

const CheckoutProduct = ({ id, title, price, rating, image }) => {
  const [{ basket }, dispatch] = useStateValue();

  const deletefromBasket = () => {
    // remove from basket
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" alt="productImage" src={image} />
      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__price">
          <small>$</small> <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <>
                <p>⭐</p>
              </>
            ))}
        </div>
        <button onClick={deletefromBasket}> Delete from Basket</button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
