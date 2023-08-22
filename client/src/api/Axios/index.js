import axios from "axios";

const BASE_URL = "https://youtube-clone-backend-re0a.onrender.com/api";

const AXIOS_INSTANCE = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default AXIOS_INSTANCE;
