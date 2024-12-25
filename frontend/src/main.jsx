import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Flowbite } from "flowbite-react";
import { customTheme } from "./themes/theme.js";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Flowbite theme={{ theme: customTheme }}>
      <App />
      <ToastContainer />
    </Flowbite>
  </StrictMode>
);
