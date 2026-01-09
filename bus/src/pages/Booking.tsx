import { useParams, useNavigate } from "react-router-dom";
import data from "../data/locchuyenxe.json";
import type { Trip } from "../types/Trip";
import { useState } from "react";
import { auth, db } from "../utils/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import "../styles/booking.css";

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const trips: Trip[] = data.json.coreData.data;
  const trip = trips.find(t => t.uuid === id);

  const [seat, setSeat] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  if (!trip) return <p>Không tìm thấy chuyến</p>;

  const submitBooking = async () => {
    if (!auth.currentUser) {
      navigate("/login");
      return;
    }

    if (!name || !phone) {
      alert("Vui lòng nhập đủ thông tin");
      return;
    }

    await addDoc(collection(db, "orders"), {
      userId: auth.currentUser.uid,
      tripId: trip.uuid,
      tripName: trip.name,
      from: trip.merchant_start_point_name,
      to: trip.merchant_end_point_name,
      seat,
      total: seat * trip.fare_amount,
      customerName: name,
      phone,
      createdAt: Timestamp.now(),
      status: "CONFIRMED",
    });

    alert("Đặt vé thành công!");
    navigate("/profile");
  };

  return (
    <div className="booking-page">
      {/* ===== HEADER ===== */}
      <div className="booking-header">
        <button onClick={() => navigate(-1)}>←</button>
        <h3>Đặt vé</h3>
      </div>

      {/* ===== TRIP INFO ===== */}
      <div className="card">
        <h4>{trip.name}</h4>
        <p>{trip.merchant_start_point_name} → {trip.merchant_end_point_name}</p>

        <div className="time-row">
          <span>{trip.departure_time}</span>
          <span>→ {Math.floor(trip.duration_in_min / 60)}h</span>
          <span>{trip.drop_off_time}</span>
        </div>
      </div>

      {/* ===== SEAT ===== */}
      <div className="card">
        <strong>Số ghế</strong>
        <div className="seat-row">
          <button onClick={() => setSeat(Math.max(1, seat - 1))}>-</button>
          <span>{seat}</span>
          <button
            onClick={() =>
              setSeat(Math.min(trip.available_seat, seat + 1))
            }
          >
            +
          </button>
        </div>
      </div>

      {/* ===== CUSTOMER ===== */}
      <div className="card">
        <strong>Thông tin người đi</strong>
        <input
          placeholder="Họ tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Số điện thoại"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* ===== FOOTER ===== */}
      <div className="booking-footer">
        <div>
          <span>Tổng tiền</span>
          <strong>
            {(seat * trip.fare_amount).toLocaleString()}đ
          </strong>
        </div>
        <button onClick={submitBooking}>
          Xác nhận
        </button>
      </div>
    </div>
  );
}
