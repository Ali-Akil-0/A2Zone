import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from "./Components/Checkout";
import Login from "./Components/Login";
import { useEffect } from "react";
// import Stripe from "stripe";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useStateValue } from "./StateProvider";
import Payment from "./Components/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Orders from "./Components/Orders";
const stripePromise = loadStripe(
  "pk_test_51KXwQaBYPZEM9xwSldm1FkealVUxxg2O4PChctlBA9xbiSAvBcwT5YEFuoeS7YjszCp5EQIt69WDsbEpTYKxUrSz00uGlmHgSd"
);
function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      console.log("the user down");
      console.log(authUser);
      if (authUser) {
        dispatch({
          type: "ADD_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "ADD_USER",
          user: null,
        });
      }
    });
  }, []);
  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret: "{{CLIENT_SECRET}}",
  // };

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Header />

                <Checkout />
              </>
            }
          />

          <>
            <Route
              path="/payment"
              element={
                <>
                  <Header />
                  <Elements stripe={stripePromise}>
                    <Payment />
                  </Elements>
                </>
              }
            />
            <Route
              path="/orders"
              element={
                <>
                  <Header />
                  <Orders />
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <Header />

                  <Home />
                </>
              }
            />
          </>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
