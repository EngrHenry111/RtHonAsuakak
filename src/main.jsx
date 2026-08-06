
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";


import "../src/styles/global.css";
import "../src/styles/viarables.css";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </HelmetProvider>
);