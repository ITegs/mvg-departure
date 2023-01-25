import React from "react";
import "./Header.css";

export default function Header(props: {
  station: string;
  selector: boolean;
  setSelector: any;
}) {
  return (
    <div className="headerWrapper">
      <h1 className="headerTitle">MVG Departure</h1>
      <h2
        className="headerStation"
        onTouchEnd={() => {
          props.setSelector(!props.selector);
        }}
      >
        <img src="train.svg" alt="train" />
        {props.station.length > 15
          ? props.station.substring(0, 10) + "..."
          : props.station}
      </h2>
    </div>
  );
}
