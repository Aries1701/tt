import { useMemo, useState } from "react";
import "./FilterModal.css";

import icSelect from "../assets/ic_select.svg";
import icSelected from "../assets/ic_selected.svg";
import icClose from "../assets/ic_close.svg";

import tripsData from "../data/locchuyenxe.json";

/* ================= TYPES ================= */

export interface FilterState {
  timeRanges: string[];
  minPrice: number;
  maxPrice: number;
  operators: string[];
  vehicleTypes: string[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  onApply: (filter: FilterState) => void;
}

/* ================= CONSTANTS ================= */

const TIME_OPTIONS = [
  { id: "early", label: "Sáng sớm", from: "00:00", to: "06:00" },
  { id: "morning", label: "Buổi sáng", from: "06:01", to: "12:00" },
  { id: "noon", label: "Buổi trưa", from: "12:01", to: "18:00" },
  { id: "evening", label: "Buổi tối", from: "18:01", to: "23:59" },
];

const PRICE_MIN = 0;
const PRICE_MAX = 3_000_000;
const PRICE_STEP = 50_000;

/* ================= COMPONENT ================= */

export default function FilterModal({ open, onClose, onApply }: Props) {
  const trips = tripsData.json.coreData.data;

  /* ===== UNIQUE DATA FROM JSON ===== */
  const operators = useMemo(() => {
    const map = new Map<string, string>();

    trips.forEach((t: any) => {
      const name = t.transport_information?.name;
      const img = t.transport_information?.image_url;
      if (name && !map.has(name)) {
        map.set(name, img);
      }
    });

    return Array.from(map.entries()).map(([name, image]) => ({
      name,
      image,
    }));
  }, [trips]);


  const vehicleTypes = useMemo(
    () =>
      Array.from(new Set(trips.map((t: any) => t.vehicle_name))).filter(Boolean),
    [trips]
  );

  /* ===== STATE ===== */
  const [filter, setFilter] = useState<FilterState>({
    timeRanges: [],
    minPrice: 50_000,
    maxPrice: 700_000,
    operators: [],
    vehicleTypes: [],
  });

  if (!open) return null;

  const toggle = (
    key: "timeRanges" | "operators" | "vehicleTypes",
    value: string
  ) => {
    setFilter((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  return (
    <div className="filter-overlay">
      <div className="filter-modal">
        {/* ===== HEADER ===== */}
        <div className="filter-header">
          <img src={icClose} onClick={onClose} />
          <h3>Lọc chuyến xe</h3>
        </div>

        {/* ===== SCROLL CONTENT ===== */}
        <div className="filter-content">
          {/* TIME */}
          <h4>Thời gian khởi hành</h4>
          <div className="time-grid">
            {TIME_OPTIONS.map((t) => (
              <div
                key={t.id}
                className={`time-box ${filter.timeRanges.includes(t.id) ? "active" : ""
                  }`}
                onClick={() => toggle("timeRanges", t.id)}
              >
                <span>{t.label}</span>
                <small>
                  {t.from} - {t.to}
                </small>
              </div>
            ))}
          </div>

          {/* PRICE */}
          <div className="price-header">
            <h4>Khoảng giá</h4>
            <span className="price-limit">0 - 3.000.000đ/vé</span>
          </div>

          <div className="price-slider">
            <div className="price-values">
              <span>{filter.minPrice.toLocaleString()} đ</span>
              <span>{filter.maxPrice.toLocaleString()} đ</span>
            </div>

            <div className="range-wrapper">
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={PRICE_STEP}
                value={filter.minPrice}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    minPrice: Math.min(
                      +e.target.value,
                      filter.maxPrice - PRICE_STEP
                    ),
                  })
                }
              />
              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={PRICE_STEP}
                value={filter.maxPrice}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    maxPrice: Math.max(
                      +e.target.value,
                      filter.minPrice + PRICE_STEP
                    ),
                  })
                }
              />
            </div>
          </div>


          {/* OPERATORS */}
          <h4>Nhà xe</h4>
          <div className="operator-list">
            {operators.map((op) => {
              const active = filter.operators.includes(op.name);
              return (
                <div
                  key={op.name}
                  className="operator-item"
                  onClick={() => toggle("operators", op.name)}
                >
                  <div className="operator-left">
                    <img
                      className="operator-logo"
                      src={op.image}
                      alt={op.name}
                    />
                    <span>{op.name}</span>
                  </div>

                  <img src={active ? icSelected : icSelect} />
                </div>
              );
            })}
          </div>


          {/* VEHICLE TYPES */}
          <h4>Loại xe</h4>
          {vehicleTypes.map((v) => (
            <div
              key={v}
              className="select-item"
              onClick={() => toggle("vehicleTypes", v)}
            >
              <span>{v}</span>
              <img
                src={
                  filter.vehicleTypes.includes(v) ? icSelected : icSelect
                }
              />

            </div>
          ))}
        </div>

        {/* ===== FOOTER ===== */}
        <div className="filter-footer">
          <button
            className="clear"
            onClick={() =>
              setFilter({
                timeRanges: [],
                minPrice: PRICE_MIN,
                maxPrice: PRICE_MAX,
                operators: [],
                vehicleTypes: [],
              })
            }
          >
            Xóa lọc
          </button>

          <button className="apply" onClick={() => onApply(filter)}>
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
}
