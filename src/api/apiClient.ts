import axios from "axios";
import { setupInterceptorsTo } from "./interceptors";

const apiClient = axios.create({
  baseURL: import.meta.env.SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptorsTo(apiClient);

export default apiClient;
