import React from "react";
import "./DepartCard.css";
import { Departure } from "../types";

export default function DepartCard(props: { dep: Departure; i: number }) {
  return (
    <div
      className={
        "DCWrapper" + (props.dep.remaining > 0 ? "" : " DCNowOutlined")
      }
      style={{ animationDelay: props.i * 0.15 + 0.8 + "s" }}
    >
      <div className="DCLine" style={{ backgroundColor: props.dep.color }}>
        {props.dep.line.number}
        {" - "}
        {props.dep.line.direction}
      </div>
      {props.dep.remaining > 0 ? (
        <div className="DCTime">
          in <b>{props.dep.remaining}</b> min
        </div>
      ) : (
        <div className="DCNow">
          <div className="DCDot"></div>
          Jetzt
        </div>
      )}
    </div>
  );
}
