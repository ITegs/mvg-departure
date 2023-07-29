import React from "react";
import "./DepartCard.css";
import { Departure } from "../types";

export default function DepartCard(props: { dep: Departure; i: number }) {
  return (
    <div
      className="DCWrapper"
      style={{ animationDelay: props.i * 0.15 + 0.8 + "s" }}
    >
      <div className="DCLine" style={{ backgroundColor: props.dep.color }}>
        {props.dep.line.number}
        {" - "}
        {props.dep.line.direction}
      </div>
      <div className="DCTime">
        in <b>{props.dep.remaining}</b> min
      </div>
    </div>
  );
}
