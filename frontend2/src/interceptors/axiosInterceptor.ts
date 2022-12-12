import { getFromCookie } from "@/utilities";
import { SnackbarUtilities } from "@/utilities/snackbarManager";
import axios, { AxiosRequestConfig } from "axios";

export const AxiosInterceptor = () => {
  const setHeaderAuthentication = (request: AxiosRequestConfig) => {
    const token = getFromCookie("token");
    console.log(token);
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    request.headers = headers;
    return request;
  };

  axios.interceptors.request.use((request) => {
    if (request.url?.includes("/post")) return setHeaderAuthentication(request);
    if (request.url?.includes("/comment")) return setHeaderAuthentication(request);
    if (request.url?.includes("/chat")) return setHeaderAuthentication(request);

    return request;
  });

  axios.interceptors.response.use(
    (response) => {
      if (response.config.url?.includes("/password-reset")) {
        SnackbarUtilities.success(response.data);
      }
      return response;
    },
    (error) => {
      const message = error.response.data;
      SnackbarUtilities.error(
        typeof message === "string" ? message : JSON.stringify(message)
      );
      return Promise.reject(error);
    }
  );
};
