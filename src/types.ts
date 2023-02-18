export type Departure = {
  departureTime: number;
  product: "BUS" | "REGIONAL_BUS";
  delay: number;
  lineBackgroundColor: any;
  label: string;
  destination: string;
};

export type Station = {
  id: string;
  name: string;
  products?: string[];
};
