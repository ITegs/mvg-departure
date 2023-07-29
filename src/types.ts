export type Departure = {
  line: Line;
  direction: string;
  station: Station;
  track: string;
  departureDate: string; // yyyymmdd
  departurePlanned: string; // hh:mm
  departureLive: string; // hh:mm
  inTime: boolean;
  notifications: Notification[];
  remaining: number;
  color: LineColor;
};

export type Line = {
  number: string;
  symbol: string;
  direction: string;
  stateless: string;
  name: Product;
};

export type Station = {
  type?: string;
  latitude?: number;
  longitude?: number;
  place?: string;
  name: string;
  globalId: string;
  divaId?: number;
  hasZoomData?: boolean;
  transportTypes: Product[];
  surroundingPlanLink?: string;
  aliases?: string;
  tariffZones?: string;
};

export enum Product {
  BUS = "Bus",
  REGIONAL_BUS = "MVV-Regionalbus",
  EXPRESS_BUS = "ExpressBus",
  SBAHN = "S-Bahn",
  UBAHN = "U-Bahn",
  TRAM = "Tram",
}

export enum LineColor {
  "Bus" = "#01586b",
  "MVV-Regionalbus" = "#01586b",
  "ExpressBus" = "#01586b",
  "S-Bahn" = "#519955",
  "U-Bahn" = "#016db4",
  "Tram" = "#ef1923",
}
