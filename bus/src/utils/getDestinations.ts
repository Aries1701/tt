import type { Trip } from "../types/Trip";
import { destinationImages } from "./destinationImages";
import fallbackImage from "../assets/destination-fallback.jpg";

export interface Destination {
  name: string;
  image: string;
}

export function getDestinations(trips: Trip[]): Destination[] {
  const map = new Map<string, Destination>();

  trips.forEach((trip) => {
    const name = trip.merchant_end_point_name;

    if (!map.has(name)) {
      map.set(name, {
        name,
        image: destinationImages[name] || fallbackImage,
      });
    }
  });

  return Array.from(map.values());
}
