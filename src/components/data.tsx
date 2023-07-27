import { Product, Station } from "../types";

const Stations: Station[] = [
  {
    globalId: "de:09162:70",
    name: "Universität",
    transportTypes: [Product.UBAHN, Product.BUS],
  },
  {
    globalId: "de:09162:1",
    name: "Karlsplatz (Stachus)",
    transportTypes: [Product.BUS, Product.TRAM, Product.UBAHN, Product.SBAHN],
  },
  {
    globalId: "de:09162:6",
    name: "Hauptbahnhof",
    transportTypes: [Product.TRAM, Product.UBAHN, Product.SBAHN],
  },
  {
    globalId: "de:09184:460",
    name: "TUM Garching",
    transportTypes: [Product.BUS, Product.UBAHN],
  },
];

export default Stations;

export const VERSION = "1.1";
