import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { store } from "../stores/store";
import { setAuth } from "../stores/auth/authSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_BE_URL ?? "http://localhost:3000",
  withCredentials: true,
});

let isRefreshing = false;

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return api(originalRequest);
      }

      try {
        isRefreshing = true;
        await api.post("/auth/refresh");
        store.dispatch(setAuth(true));

        return api(originalRequest);
      } catch (refreshError) {
        store.dispatch(setAuth(false));

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
