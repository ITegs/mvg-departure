import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {window.innerWidth > 1400 ? (
      <div className="qr-code">
        <img src="qr.png" />
        <h2>Diese App ist optimiert für mobile Geräte!</h2>
        <p>
          Scan den Qr-Code mit deinem Smartphone um MVG-departure nutzen zu
          können.
        </p>
      </div>
    ) : (
      <App />
    )}
  </React.StrictMode>
);
