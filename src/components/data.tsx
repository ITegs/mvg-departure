import { Product, Station } from "../types";

const Stations: Station[] = [
  {
    id: "de:09162:70",
    name: "Universität",
    products: [Product.UBAHN, Product.BUS],
  },
  {
    id: "de:09162:1",
    name: "Karlsplatz (Stachus)",
    products: [Product.BUS, Product.TRAM, Product.UBAHN, Product.SBAHN],
  },
  {
    id: "de:09162:6",
    name: "Hauptbahnhof",
    products: [Product.TRAM, Product.UBAHN, Product.SBAHN],
  },
  {
    id: "de:09184:460",
    name: "TUM Garching",
    products: [Product.BUS, Product.UBAHN],
  },
];

export default Stations;

export const VERSION = "1.0";
