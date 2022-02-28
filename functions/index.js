const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51KXwQaBYPZEM9xwSnWugO7prz0AJm2Wd1loBfeFjX3s7IQ5TapmNTFoj3eoMS98aFsL2EdTexcZIAQTfc0TueSOI00tTZ6MRUc"
);
