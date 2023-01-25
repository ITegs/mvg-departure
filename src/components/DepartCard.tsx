import React from "react";
import "./DepartCard.css";
import { Departure } from "../types";

export default function DepartCard(dep: Departure) {
  return (
    <div className="DCWrapper">
      <div
        className="DCLine"
        style={{ backgroundColor: dep.lineBackgroundColor }}
      >
        {dep.label}
        {" - "}
        {dep.destination}
      </div>
      <div className="DCTime">
        in <b>{dep.departureTime + dep.delay}</b> min
      </div>
    </div>
  );
}
