import React from "react";
import { Dna } from "react-loader-spinner";
import Stations from "./StationList";
import "./StationSelector.css";

export default function StationSelector(props: any) {
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="SSWrapper">
      <div className="SSTitle">
        Station wählen
        <Dna
          wrapperStyle={{
            opacity: loading ? "1" : "0",
            transition: "all 0.5s ease",
          }}
        />
      </div>
      <div className="SSStationList">
        {Stations.map((station: any, i: number) => (
          <div
            className="SSStation"
            key={i}
            style={
              station.id === props.stationID
                ? { backgroundColor: "#777da7" }
                : {}
            }
            onClick={() => {
              setLoading(true);
              props.setStationID(station.id);
              props.fetch(station.id).then(() => {
                props.setStationName(station.name);
                props.setSelector(false);
                setLoading(false);
              });
            }}
          >
            {station.name}
          </div>
        ))}
      </div>
    </div>
  );
}
