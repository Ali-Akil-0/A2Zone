import axios from "axios";
const instance = axios.create({
  // The api URL (Cloud function ??)
  baseURL: "...",
});
export default instance;
