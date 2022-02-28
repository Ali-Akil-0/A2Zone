import React from "react";
import "./Product.css";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useStateValue } from "../StateProvider";
const Product = ({ id, title, image, price, rating }) => {
  // dispatch how we manipularte the dataLayer
  const [{ basket }, dispatch] = useStateValue();
  const addToBasket = () => {
    // dippatch an action into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product_info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small> <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <>
                <p>⭐</p>
              </>
            ))}
        </div>
      </div>
      <img alt="productImage" src={image} />
      <button onClick={addToBasket}> Add to Basket</button>
    </div>
  );
};

export default Product;
