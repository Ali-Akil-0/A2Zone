const functions = require("firebase-functions");
// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();
// express
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51KXwQaBYPZEM9xwSnWugO7prz0AJm2Wd1loBfeFjX3s7IQ5TapmNTFoj3eoMS98aFsL2EdTexcZIAQTfc0TueSOI00tTZ6MRUc"
);

// app config
const app = express();
// const port = process.env.PORT || 9000;
// db  config
// middlewares
app.use(express.json());
app.use(cors());
// get
app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});
app.post("/payment/create", async (req, res) => {
  const total = req.query.total;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
// post
// listener for could functions
exports.api = functions.https.onRequest(app);
// the endpoint :
// http://localhost:5001/a2zone/us-central1/api

// listener for mern
//app.listen(port, () => console.log("running on some port"));
