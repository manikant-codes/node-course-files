import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App.jsx";
import { Flowbite } from "flowbite-react";
import { customTheme } from "./theme.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Flowbite theme={{ theme: customTheme }}>
      <App />
    </Flowbite>
  </StrictMode>
);
