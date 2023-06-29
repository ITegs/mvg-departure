import React from "react";
import { Dna } from "react-loader-spinner";
import Search from "./Search";
import Stations from "./data";
import "./StationSelector.css";
import { Station } from "../types";

export default function StationSelector(props: any) {
  const [loading, setLoading] = React.useState(false);
  const [isSearch, setIsSearch] = React.useState(false);

  const removeStation = (id: string) => {
    let newStations = Stations.filter((s: Station) => s.globalId !== id);
    localStorage.setItem("stations", JSON.stringify(newStations));
    Stations.length = 0;
    Stations.push(...newStations);
  };

  return (
    <div className="SSWrapper">
      <div
        className="SSTitle"
        onClick={() => {
          setIsSearch(!isSearch);
        }}
      >
        <img src="search.svg" alt="search" />
        Station {isSearch ? "suchen" : "wählen"}
        <Dna
          wrapperStyle={{
            opacity: loading ? "1" : "0",
            transition: "all 0.5s ease",
          }}
        />
      </div>
      <div className="SSStationList">
        {!isSearch ? (
          Stations.map((station: Station, i: number) => (
            <div
              className="SSStation"
              key={i}
              style={
                station.globalId === props.stationID
                  ? { backgroundColor: "#777da7" }
                  : {}
              }
              onClick={() => {
                setLoading(true);
                props.setStationID(station.globalId);
                props.fetch(station.globalId).then(() => {
                  props.setStationName(station.name);
                  props.setSelector(false);
                  setLoading(false);
                });
              }}
              onDoubleClick={() => {
                removeStation(station.globalId);
              }}
            >
              {station.name}
            </div>
          ))
        ) : (
          <Search
            setSelector={props.setSelector}
            setStationID={props.setStationID}
            setStationName={props.setStationName}
          />
        )}
      </div>
    </div>
  );
}
