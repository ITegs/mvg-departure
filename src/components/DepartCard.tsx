import React from "react";
import "./DepartCard.css";

export default function DepartCard() {
  return (
    <div className="DCWrapper">
      <div className="DCLine" style={{ backgroundColor: "#0472b3" }}>
        U6 Garching, Forschungszentrum
      </div>
      <div className="DCTime">
        in <a>12</a> min
      </div>
    </div>
  );
}
