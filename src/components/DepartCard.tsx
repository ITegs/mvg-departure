import React from "react";
import "./DepartCard.css";
import { Departure } from "../types";

export default function DepartCard(dep: Departure) {
  return (
    <div className="DCWrapper">
      <div className="DCLine" style={{ backgroundColor: "black" }}>
        {dep.line.number}
        {" - "}
        {dep.line.direction}
      </div>
      <div className="DCTime">
        in <b>{dep.remaining}</b> min
      </div>
    </div>
  );
}
