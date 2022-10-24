import React from "react";
import "./Header.css";

export default function Header({ station }: { station: string }) {
  return (
    <div className="headerWrapper">
      <h1 className="headerTitle">MVG Departure</h1>
      <h2 className="headerStation">
        <img src="train.svg" alt="train" />
        {station}
      </h2>
    </div>
  );
}
