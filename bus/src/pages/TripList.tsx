import data from "../data/locchuyenxe.json";
import type { Trip } from "../types/Trip";
import TripItemCard from "../components/TripItemCard";
import "../styles/trip-list.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useMemo, useState, useEffect } from "react";
import FilterModal, { type FilterState } from "../components/FilterModal";

/* ===== ICON ===== */
import arrowIcon from "../assets/ic_arrow.svg";
import filterGreyIcon from "../assets/ic_filter_grey.svg";
import filterWhiteIcon from "../assets/ic_filter_white.svg";
import backIcon from "../assets/ic_back.svg"

const timeToMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const TIME_RANGE_MAP: Record<
  string,
  { start: number; end: number }
> = {
  early: { start: 0, end: 360 },       // 00:00 - 06:00
  morning: { start: 361, end: 720 },   // 06:01 - 12:00
  noon: { start: 721, end: 1080 },     // 12:01 - 18:00
  evening: { start: 1081, end: 1439 }, // 18:01 - 23:59
};




export default function TripList() {
  const navigate = useNavigate();
  const trips: Trip[] = data.json.coreData.data;

  /* ===== FILTER MODAL ===== */
  const [openFilter, setOpenFilter] = useState(false);
  const [filterState, setFilterState] = useState<FilterState | null>(null);

  /* ===== DATE LIST ===== */
  const dates = useMemo(() => {
    const set = new Set<string>();
    trips.forEach((t) => {
      const m = moment(t.departure_date, "DD-MM-YYYY");
      if (m.isValid()) set.add(m.format("YYYY-MM-DD"));
    });
    return Array.from(set).sort();
  }, [trips]);

  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    if (!dates.length || selectedDate) return;
    const tomorrow = moment().add(1, "day").format("YYYY-MM-DD");
    setSelectedDate(dates.includes(tomorrow) ? tomorrow : dates[0]);
  }, [dates, selectedDate]);

  /* ===== SORT ===== */
  type SortType =
    | "time-asc"
    | "time-desc"
    | "price-asc"
    | "price-desc"
    | "rating-asc"
    | "rating-desc"
    | "";

  const [sort, setSort] = useState<SortType>("");

  const toggleSort = (type: "time" | "price" | "rating") => {
    setSort((prev) => {
      if (!prev.startsWith(type)) return `${type}-asc`;
      if (prev.endsWith("asc")) return `${type}-desc`;
      return "";
    });
  };

  /* ===== CÓ LỌC HAY KHÔNG ===== */
  const hasFilter =
    !!sort ||
    !!filterState?.timeRanges.length ||
    !!filterState?.operators.length ||
    !!filterState?.vehicleTypes.length ||
    filterState?.minPrice !== 0 ||
    filterState?.maxPrice !== 3_000_000;



  const filteredTrips = useMemo(() => {
    if (!selectedDate) return [];

    let list = trips.filter(
      (t) =>
        moment(t.departure_date, "DD-MM-YYYY").format("YYYY-MM-DD") ===
        selectedDate
    );

    if (filterState) {
      list = list.filter((t) => {
        /* ===== PRICE ===== */
        if (
          t.fare_amount < filterState.minPrice ||
          t.fare_amount > filterState.maxPrice
        ) {
          return false;
        }

        /* ===== OPERATORS ===== */
        if (
          filterState.operators.length &&
          !filterState.operators.includes(
            t.transport_information?.name
          )
        ) {
          return false;
        }

        /* ===== VEHICLE TYPES ===== */
        if (
          filterState.vehicleTypes.length &&
          !filterState.vehicleTypes.includes(t.vehicle_name)
        ) {
          return false;
        }

        if (filterState.timeRanges.length) {
          if (!t.departure_time) return false;

          const tripMinutes = timeToMinutes(t.departure_time);

          const matchTime = filterState.timeRanges.some((range) => {
            const config = TIME_RANGE_MAP[range];
            if (!config) return false;

            return (
              tripMinutes >= config.start &&
              tripMinutes <= config.end
            );
          });

          if (!matchTime) return false;
        }


        return true;
      });
    }


    // SORT
    switch (sort) {
      case "time-asc":
        list.sort(
          (a, b) =>
            moment(a.departure_time, "HH:mm").valueOf() -
            moment(b.departure_time, "HH:mm").valueOf()
        );
        break;

      case "time-desc":
        list.sort(
          (a, b) =>
            moment(b.departure_time, "HH:mm").valueOf() -
            moment(a.departure_time, "HH:mm").valueOf()
        );
        break;

      case "price-asc":
        list.sort((a, b) => a.fare_amount - b.fare_amount);
        break;

      case "price-desc":
        list.sort((a, b) => b.fare_amount - a.fare_amount);
        break;

      case "rating-desc":
        list.sort(
          (a, b) =>
            (b.transport_information?.rating ?? 0) -
            (a.transport_information?.rating ?? 0)
        );
        break;
    }

    return [...list];
  }, [trips, selectedDate, filterState, sort]);



  return (
    <div className="trip-list-page">
      {/* ===== HEADER ===== */}
      <div className="trip-list-header">
        <div className="header-left">
          <button className="btn-back" onClick={() => navigate(-1)}>
            <img src={backIcon} alt="back" />
          </button>
          <div className="header-title">
            <h3>Chọn chuyến đi</h3>

          </div>
        </div>

        {hasFilter && (
          <span
            className="clear-filter"
            onClick={() => {
              setSort("");
              setFilterState(null);
            }}
          >
            Xóa lọc
          </span>
        )}
      </div>

      {/* ===== DATE SCROLL ===== */}
      <div className="date-scroll-wrapper">
        <div className="date-scroll">
          {dates.map((d) => {
            const m = moment(d);
            // Format sang Tiếng Anh để giống ảnh 2 (SA, SU, MO...)
            const dayOfWeek = m.format("dd").toUpperCase();

            return (
              <div
                key={d}
                className={`date-item ${d === selectedDate ? "active" : ""}`}
                onClick={() => setSelectedDate(d)}
              >
                <div className="date-dow">{dayOfWeek}</div>
                <div className="date-day">{m.format("DD/MM")}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===== FILTER BAR ===== */}
      <div className="filter-bar">
        <div className="sort-buttons">
          <button className={sort.startsWith("time") ? "active-sort" : ""} onClick={() => toggleSort("time")}>Giờ chạy</button>
          <button className={sort.startsWith("price") ? "active-sort" : ""} onClick={() => toggleSort("price")}>Giá vé</button>
          <button className={sort.startsWith("rating") ? "active-sort" : ""} onClick={() => toggleSort("rating")}>Đánh giá</button>
        </div>

        <button className={`btn-filter ${hasFilter ? "active" : ""}`} onClick={() => setOpenFilter(true)}>
          Lọc
          <img src={hasFilter ? filterWhiteIcon : filterGreyIcon} alt="filter" />
        </button>
      </div>

      {/* ===== FILTER MODAL ===== */}
      <FilterModal
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        onApply={(f) => {
          setFilterState(f);
          setOpenFilter(false);
        }}
      />

      {/* ===== TRIP LIST ===== */}
      <div className="trip-items">
        {filteredTrips.map((trip) => (
          <TripItemCard key={trip.uuid} trip={trip} />
        ))}

        {!filteredTrips.length && (
          <p style={{ padding: 20, color: "#888" }}>
            Không có chuyến cho ngày này
          </p>
        )}
      </div>
    </div>
  );
}
