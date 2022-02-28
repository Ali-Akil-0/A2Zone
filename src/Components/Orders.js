import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";
import "./Orders.css";
import Order from "./Order";

const Orders = () => {
  const [{ basket, user }] = useStateValue();
  const [orders, setOrders] = useState([]);
  const [test, setTest] = useState([]);

  useEffect(() => {
    async function test() {
      console.log("the user", user);
      if (user) {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          console.log("here");
          console.log(`${doc.id} => ${doc.data()}`);
        });
        setOrders(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
        //     const querySnapshot = await getDocs(collection(db, "users"));
        //     querySnapshot.forEach((doc) => {
        //       console.log(`${doc.id} => ${doc.data()}`);
        //       setOrders(
        //         doc.docs.map((doc1) => ({
        //           id: doc1.id,
        //           data: doc1.data(),
        //         }))
        //       );
        //     });
        //   } else {
        //     setOrders([]);
        //   }
      } else {
        setOrders([]);
      }
    }
    test();
  }, [user]);
  console.log("The orders are");
  console.log(orders);
  return (
    <div className="orders">
      <h1>Your Orders ?</h1>
      <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
