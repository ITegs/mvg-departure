export type Departure = {
    departureTime: number,
    product: "BUS" | "REGIONAL_BUS",
    delay: number
    lineBackgroundColor: any,
    label: String
    destination: String
}

export type Station = {
    id: String,
    name: String
}