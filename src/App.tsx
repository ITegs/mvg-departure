import React, { useEffect, useState } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";
import { Triangle } from "react-loader-spinner";
import "./App.css";
import { Departure } from "./types";
import Header from "./components/Header";
import DepartCard from "./components/DepartCard";
import Footer from "./components/Footer";
import StationSelector from "./components/StationSelector";
import Stations, { VERSION } from "./components/data";
import Banner from "./components/Banner";

function App() {
  const [showSelector, setShowSelector] = useState(false);

  const [stationID, setStationID] = useState<string>(Stations[0].id);
  const [stationName, setStationName] = useState<string>(Stations[0].name);

  const epochToRemainingTime = (epoch: number) => {
    const now = new Date();
    const departure = new Date(epoch);
    const diff = departure.getTime() - now.getTime();
    return Math.floor(diff / 1000 / 60);
  };

  const [departures, setDepartures] = useState<Departure[]>([]);

  const fetchDepartures = async (ID: string) => {
    await fetch(
      "https://www.mvv-muenchen.de/?eID=departuresFinder&action=get_departures&stop_id=" +
        ID +
        "&requested_timestamp=" +
        Math.floor(Date.now() / 1000) +
        "&lines"
    )
      .then((response) => response.json())
      .then((data) => {
        // change 'departureLive' & 'departureDate' to epoch and calculate remaining time
        data.departures.forEach((departure: Departure) => {
          let dateY = departure.departureDate.slice(0, 4);
          let dateM = departure.departureDate.slice(4, 6);
          let dateD = departure.departureDate.slice(6, 8);
          let timeH = departure.departureLive.slice(0, 2);
          let timeM = departure.departureLive.slice(3, 5);
          let dateString =
            dateY +
            "-" +
            dateM +
            "-" +
            dateD +
            "T" +
            timeH +
            ":" +
            timeM +
            ":00";
          let epoch = new Date(dateString).getTime();
          departure.remaining = epochToRemainingTime(epoch);
        });
        let filteredDepartures = data.departures;

        filteredDepartures = data.departures.filter(
          // show only departures in the next 30 minutes
          (d: Departure) => d.remaining < 100
        );

        Stations.forEach((station) => {
          if (station.id === ID) {
            // if no products are given, show all
            if (station.products.length === 0) {
              return;
            }
            // else filter departures by products
            filteredDepartures = filteredDepartures.filter((d: Departure) =>
              station.products.includes(d.line.name)
            );
          }
        });

        // sort by departure time + delay
        filteredDepartures.sort((a: Departure, b: Departure) => {
          return a.remaining - b.remaining;
        });

        setDepartures(filteredDepartures);
      });
  };

  useEffect(() => {
    fetchDepartures(stationID);
  }, [stationID]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const stations = localStorage.getItem("stations");
    const version = localStorage.getItem("version");
    if (stations && version === VERSION) {
      Stations.length = 0;
      Stations.push(...JSON.parse(stations));
    }
    localStorage.setItem("version", VERSION);
  }, []);

  return (
    <PullToRefresh
      onRefresh={fetchDepartures.bind(null, stationID)}
      refreshingContent={
        <Triangle
          height={50}
          width={50}
          color="#d5573b"
          wrapperStyle={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#e8e9f3",
          }}
        />
      }
      resistance={5}
      backgroundColor="#e8e9f3"
      pullingContent={<></>}
    >
      <div className="App">
        <Header
          station={stationName}
          stationID={stationID}
          fetch={fetchDepartures}
          selector={showSelector}
          setSelector={setShowSelector}
        />
        {showSelector && (
          <div className="StationSelector">
            <StationSelector
              stationID={stationID}
              setStationID={setStationID}
              setStationName={setStationName}
              fetch={fetchDepartures}
              setSelector={setShowSelector}
            />
          </div>
        )}
        <Banner
          headline="Aufgrund von API-Änderungen ist die App derzeit nicht verfügbar."
          sub="Wir arbeiten an einer Lösung."
        />
        <div
          className="departures"
          style={showSelector ? { opacity: 0.2 } : { opacity: 1 }}
          onClick={() => {
            showSelector && setShowSelector(false);
          }}
        >
          {departures.map((departure, i) => (
            <DepartCard {...departure} />
          ))}
        </div>
        <Footer />
      </div>
    </PullToRefresh>
  );
}

export default App;
