import { useState } from "react";
import data from "../data/locchuyenxe.json";
import CategoryMenu from "../components/CategoryMenu";
import PromoBanner from "../components/PromoBanner";
import DestinationCard from "../components/DestinationCard";
import { getDestinations } from "../utils/getDestinations";
import type { Trip } from "../types/Trip";
import TripCard from "../components/TripCard";
import StickySearchBar from "../components/StickySearchBar";

export default function Home() {
  const trips: Trip[] = data.json.coreData.data;
  const destinations = getDestinations(trips);

  // 👉 STATE FILTER
  const [selectedDestination, setSelectedDestination] =
    useState<string | null>(null);

  const filteredTrips = selectedDestination
    ? trips.filter(
        (trip) =>
          trip.merchant_end_point_name === selectedDestination
      )
    : trips;

  return (
    <>
      <StickySearchBar />
      <CategoryMenu />
      <PromoBanner />

      <div style={{ padding: "12px 12px 80px" }}>
        {/*  ĐIỂM ĐẾN  */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <h3>Điểm đến</h3>

            {selectedDestination && (
              <span
                style={{ color: "#ff7a00", fontSize: 14 }}
                onClick={() => setSelectedDestination(null)}
              >
                Tất cả
              </span>
            )}
          </div>

          <div
            style={{
              display: "flex",
              gap: 12,
              overflowX: "auto",
              paddingBottom: 4,
            }}
          >
            {destinations.map((d) => (
              <DestinationCard
                key={d.name}
                destination={d}
                active={selectedDestination === d.name}
                onClick={() => {
                  setSelectedDestination(d.name);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            ))}
          </div>
        </div>

        {/*  CHUYẾN XE  */}
        <h3 style={{ marginBottom: 12 }}>
          {selectedDestination
            ? `Chuyến đi ${selectedDestination}`
            : "Chuyến xe phổ biến"}
        </h3>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {filteredTrips.length > 0 ? (
            filteredTrips.map((trip) => (
              <TripCard key={trip.uuid} trip={trip} />
            ))
          ) : (
            <p style={{ textAlign: "center", color: "#777" }}>
              Không có chuyến phù hợp
            </p>
          )}
        </div>
      </div>
    </>
  );
}
