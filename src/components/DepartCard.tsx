import React from "react";
import "./DepartCard.css";

export default function DepartCard({ departures }: any) {
  return (
    <div className="DCWrapper">
      <div
        className="DCLine"
        style={{ backgroundColor: departures.lineBackgroundColor }}
      >
        {departures.label}
        {" - "}
        {departures.destination}
      </div>
      <div className="DCTime">
        in <a>{departures.departureTime + departures.delay}</a> min
      </div>
    </div>
  );
}
