export type Departure = {
  departureTime: number;
  product: Product;
  delay: number;
  lineBackgroundColor: any;
  label: string;
  destination: string;
};

export type Station = {
  id: string;
  name: string;
  products: Product[];
};

export enum Product {
  BUS = "BUS",
  REGIONAL_BUS = "REGIONAL_BUS",
  SBAHN = "SBAHN",
  UBAHN = "UBAHN",
  TRAM = "TRAM",
}
