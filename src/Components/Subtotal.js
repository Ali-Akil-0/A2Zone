import React from "react";
import "./Subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../StateProvider";
import { getBasketTotal } from "../reducer";
import { useNavigate } from "react-router-dom";

const Subtotal = () => {
  const navigate = useNavigate();
  const [{ basket }, dispatch] = useStateValue();
  console.log(basket);

  console.log("the total is : ");
  console.log(getBasketTotal(basket));

  return (
    <div className="subtotal">
      {/* For the pricing */}
      <CurrencyFormat
        value={getBasketTotal(basket)}
        decimalScale={2}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
        renderText={(value) => (
          <>
            <p>
              Subtotal ( {basket?.length} items ) : <strong> {value} </strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This is a gift
            </small>
          </>
        )}
      />
      <button onClick={(e) => navigate("/payment", { replace: true })}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Subtotal;
