import React, { useEffect, useState } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";
import { Triangle } from "react-loader-spinner";
import "./App.css";
import { Departure } from "./types";
import Header from "./components/Header";
import DepartCard from "./components/DepartCard";
import Footer from "./components/Footer";
import StationSelector from "./components/StationSelector";
import Stations from "./components/StationList";

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
    await fetch("https://www.mvg.de/api/fahrinfo/departure/" + ID)
      .then((response) => response.json())
      .then((data) => {
        // change 'departureTime' from epoch to remaining time
        data.departures.forEach((departure: Departure) => {
          departure.departureTime = epochToRemainingTime(
            departure.departureTime
          );
        });
        let filteredDepartures = data.departures;

        filteredDepartures = data.departures.filter(
          // show only departures in the next 30 minutes
          (d: Departure) => d.departureTime < 100
        );

        Stations.forEach((station) => {
          if (station.id === ID) {
            // if no products are given, show all
            if (station.products.length === 0) {
              return;
            }
            // else filter departures by products
            filteredDepartures = filteredDepartures.filter((d: Departure) =>
              station.products.includes(d.product)
            );
          }
        });

        // if no delay is given, set it to 0
        filteredDepartures.forEach((departure: Departure) => {
          if (!departure.delay) {
            departure.delay = 0;
          }
        });

        // sort by departure time + delay
        filteredDepartures.sort((a: Departure, b: Departure) => {
          return a.departureTime + a.delay - (b.departureTime + b.delay);
        });

        setDepartures(filteredDepartures);
      });
  };

  useEffect(() => {
    fetchDepartures(stationID);
  }, [stationID]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const stations = localStorage.getItem("stations");
    if (stations) {
      Stations.length = 0;
      Stations.push(...JSON.parse(stations));
    }
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
