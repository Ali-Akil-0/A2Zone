import axios from "axios";
const instance = axios.create({
  // The api URL (Cloud function ??)
  baseURL: "http://localhost:5001/a2zone/us-central1/api",
});
export default instance;
