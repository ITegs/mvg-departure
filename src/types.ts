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
  REGIONAL_BUS = "REGIONAL_BUS",
  SBAHN = "SBAHN",
  UBAHN = "U-Bahn",
  TRAM = "TRAM",
}
