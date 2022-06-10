import axios from "axios";

const ApiUpload = axios.create({
  baseURL: "https://osads-upload.herokuapp.com",
});

export default ApiUpload;
