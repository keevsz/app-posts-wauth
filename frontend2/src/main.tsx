import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { AxiosInterceptor } from "@/interceptors";
import store from "./redux/store";
import { SnackbarConfig } from "./utilities/snackbarManager";
import { SnackbarProvider } from "notistack";
import "./index.css"
AxiosInterceptor();
createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <SnackbarProvider autoHideDuration={2500}> 
      <SnackbarConfig />
      <App />
    </SnackbarProvider>
  </Provider>
);
