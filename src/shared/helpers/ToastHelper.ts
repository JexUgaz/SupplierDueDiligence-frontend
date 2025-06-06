import { toast, type ToastOptions } from "react-toastify";

export class ToastHelper {
  private static readonly defaultOptions: ToastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  static success(message: string, options?: ToastOptions) {
    toast.success(message, { ...this.defaultOptions, ...options });
  }

  static error(message: string, options?: ToastOptions) {
    toast.error(message, { ...this.defaultOptions, ...options });
  }

  static info(message: string, options?: ToastOptions) {
    toast.info(message, { ...this.defaultOptions, ...options });
  }

  static warning(message: string, options?: ToastOptions) {
    toast.warning(message, { ...this.defaultOptions, ...options });
  }
}
