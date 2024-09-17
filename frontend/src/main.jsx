import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Navbar />
    <App />
    <ToastContainer />
  </BrowserRouter>
);
