import { useSnackbar, VariantType, WithSnackbarProps } from "notistack";

let useSnackbarRef: WithSnackbarProps;
export const SnackbarConfig: React.FC = () => {
  useSnackbarRef = useSnackbar();
  return null
};
export const SnackbarUtilities = {
  toast(msg: string, variant: VariantType = "default") {
    useSnackbarRef.enqueueSnackbar(msg, { variant });
  },
  success(message: string) {
    this.toast(message, "success");
  },
  error(message: string) {
    this.toast(message, "error");
  },
  info(message: string) {
    this.toast(message, "info");
  },
  warning(message: string) {
    this.toast(message, "warning");
  },
};
