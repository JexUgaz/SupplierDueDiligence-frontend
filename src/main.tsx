import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@/assets/styles/index.css";
import { AuthProvider } from "@/shared/providers/AuthProvider.tsx";
import { ToastContainer } from "react-toastify";
import { AppContainer } from "@/shared/components/containers/AppContainer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <AppContainer>
        <App />
      </AppContainer>
      <ToastContainer />
    </AuthProvider>
  </StrictMode>
);
