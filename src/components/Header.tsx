import React from "react";
import { Product } from "../types";
import "./Header.css";
import Stations from "./data";

export default function Header(props: {
  station: string;
  stationID: string;
  fetch: any;
  selector: boolean;
  setSelector: any;
}) {
  const [refresh, setRefresh] = React.useState(false);

  const addProduct = (product: Product) => {
    Stations.forEach((station) => {
      if (station.globalId === props.stationID) {
        if (station.transportTypes.includes(product)) {
          station.transportTypes.splice(
            station.transportTypes.indexOf(product),
            1
          );
        }
        if (station.transportTypes.length === 0) {
          resetProducts();
        }
      }
    });
    localStorage.setItem("stations", JSON.stringify(Stations));
    props.fetch(props.stationID);
  };

  const resetProducts = () => {
    Stations.forEach((station) => {
      if (station.globalId === props.stationID) {
        fetch(
          "https://www.mvg.de/api/fahrinfo/location/query?q=" + station.globalId
        )
          .then((response) => response.json())
          .then((data) => {
            station.transportTypes = data.locations[0].products;
          })
          .then(() => {
            localStorage.setItem("stations", JSON.stringify(Stations));
            props.fetch(props.stationID);
            setRefresh(!refresh);
          });
      }
    });
  };

  return (
    <div className="headerWrapper">
      <div className="headerMain">
        <h1 className="headerTitle">MVG Departure</h1>
        <h2
          className="headerStation"
          onTouchEnd={() => {
            props.setSelector(!props.selector);
          }}
        >
          <img src="train.svg" alt="train" />
          {props.station.length > 15
            ? props.station.substring(0, 10) + "..."
            : props.station}
        </h2>
      </div>
      {/* <div
        className="headerFilter"
        onTouchStart={(document.body.style.overflowX = "hidden" as any)}
      >
        {Stations.map((station, i) => (
          <div key={i}>
            {props.stationID === station.globalId && (
              <div className="headerProducts">
                <p>Filter:</p>
                <div className="headerProductList">
                  {station.transportTypes.length !== 0 ? (
                    station.transportTypes.map((product, i) => (
                      <div
                        className="headerFilterProduct"
                        key={i}
                        onClick={() => addProduct(product)}
                      >
                        {product !== Product.REGIONAL_BUS
                          ? product
                          : "REGIONAL BUS"}
                        <img src="close.svg" alt="close" height={15} />
                      </div>
                    ))
                  ) : (
                    <p>Laden...</p>
                  )}
                </div>
                <img
                  src="refresh.svg"
                  alt="refresh"
                  height={25}
                  onClick={() => resetProducts()}
                />
              </div>
            )}
          </div>
        ))}
      </div> */}
    </div>
  );
}
