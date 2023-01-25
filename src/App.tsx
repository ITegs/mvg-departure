import React, { useEffect, useState } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";
import { Triangle } from "react-loader-spinner";
import "./App.css";
import { Departure } from "./types";
import Header from "./components/Header";
import DepartCard from "./components/DepartCard";
import Footer from "./components/Footer";
import StationSelector from "./components/StationSelector";

function App() {
  const [showSelector, setShowSelector] = useState(false);

  const [stationID, setStationID] = useState<string>("de:09162:70"); // Universität
  const [stationName, setStationName] = useState<string>("Universität");

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

        const filteredDepartures = data.departures.filter(
          // show only departures in the next 30 minutes
          (d: Departure) =>
            d.departureTime < 30 &&
            // if the departure time is negative, remove it
            d.departureTime > 0 &&
            // if the product is "BUS" remove it
            d.product !== "BUS" &&
            // if the pruoduct is "REGIONAL_BUS" remove it
            d.product !== "REGIONAL_BUS"
        );

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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      backgroundColor="#e8e9f3"
      pullingContent={<></>}
    >
      <div className="App">
        <Header
          station={stationName}
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
