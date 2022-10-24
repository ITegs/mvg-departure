import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <div className="headerWrapper">
      <h1 className="headerTitle">MVG Departure</h1>
      <h2 className="headerStation">
        <img src="train.svg" alt="train" />
        Universität
      </h2>
    </div>
  );
}
