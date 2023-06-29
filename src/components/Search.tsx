import React from "react";
import { MagnifyingGlass } from "react-loader-spinner";
import { Station } from "../types";
import "./Search.css";
import Stations from "./data";

export default function Search({
  setSelector,
  setStationID,
  setStationName,
}: any) {
  const [search, setSearch] = React.useState("");
  const [results, setResults] = React.useState<Station[]>();
  const [fade, setFade] = React.useState(false);

  const searchStation = (search: string) => {
    fetch(`https://www.mvg.de/api/fib/v2/location?query=${search}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let stations: Station[] = [];
        for (let i = 0; i < 3; i++) {
          if (data[i] == null) break;
          else if (
            stations.find((s) => s.name === data[i].name) == null &&
            data[i].transportTypes != null
          )
            stations.push({
              name: data[i].name,
              globalId: data[i].id,
              transportTypes: data[i].products,
            });
        }

        setResults(stations);
      })
      .catch((err) => console.log(err));
  };

  const selectStation = (station: Station) => {
    setStationID(station.globalId);
    setStationName(station.name);
    setFade(true);
    setTimeout(() => {
      setSelector(false);
    }, 500);
  };

  const addToFavourites = (station: Station) => {
    Stations.push(station);
    localStorage.setItem("stations", JSON.stringify(Stations));
    setFade(true);
    setTimeout(() => {
      setSelector(false);
    }, 500);
  };

  return (
    <div
      className="SWrapper"
      style={{
        opacity: fade ? "0" : "1",
        transition: "all 0.5s ease",
      }}
    >
      <div className="SInput">
        <input
          type="text"
          enterKeyHint="search"
          placeholder="Station"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchStation(search);
            }
          }}
        />
        <img
          src="search.svg"
          alt="search"
          onClick={() => {
            searchStation(search);
          }}
        />
      </div>
      {results == null ? (
        <MagnifyingGlass />
      ) : (
        results.map((result, i) => (
          <div
            className="SResult"
            key={i}
            onClick={() => selectStation(result)}
          >
            <div className="SResultName">
              {result.name.length > 25
                ? result.name.substring(0, 25) + "..."
                : result.name}
            </div>
            <div className="SResultProducts">
              {result.transportTypes?.map((p, i) => (
                <div className="SResultProduct" key={i}>
                  {p.charAt(0).toUpperCase()}
                </div>
              ))}
            </div>
            <img
              src="add.svg"
              alt="add"
              onClick={() => {
                addToFavourites(result);
              }}
            />
          </div>
        ))
      )}
    </div>
  );
}
