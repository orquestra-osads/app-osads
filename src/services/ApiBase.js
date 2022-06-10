import axios from "axios";

const ApiBase = axios.create({
  baseURL: "https://osads.herokuapp.com",
});

export default ApiBase;
