import type { Trip } from "../types/Trip";
import { useNavigate } from "react-router-dom";
import "./TripCard.css";
import { doc, setDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { useUserProfile } from "../hooks/useUserProfile";


interface Props {
  trip: Trip;
}

export default function TripCard({ trip }: Props) {
  // 👉 LẤY PROFILE USER (avatar + favorites)
  const profile = useUserProfile();

  const navigate = useNavigate();

  // 👉 KIỂM TRA CÓ PHẢI YÊU THÍCH KHÔNG
  const isFavorite = profile?.favorites?.includes(trip.uuid);

  // 👉 TOGGLE FAVORITE
  const toggleFavorite = async () => {
    if (!auth.currentUser) {
      alert("Vui lòng đăng nhập");
      return;
    }

    const ref = doc(db, "users", auth.currentUser.uid);

    await setDoc(
      ref,
      {
        favorites: isFavorite
          ? arrayRemove(trip.uuid)
          : arrayUnion(trip.uuid),
      },
      { merge: true }
    );
  };


  return (
    <div className="trip-card">
      {/* ===== IMAGE ===== */}
      <div className="image-wrapper">
        <img
          src={trip.transport_information.image_url}
          alt={trip.transport_information.name}
        />

        {/* FAVORITE BUTTON */}
        <button className="fav-btn" onClick={toggleFavorite}>
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="trip-content">
        <h4>{trip.name}</h4>
        <p className="merchant">
          {trip.transport_information.name}
        </p>

        <div className="time-row">
          <span>{trip.departure_time}</span>
          <span>
            → {Math.floor(trip.duration_in_min / 60)}h
          </span>
          <span>{trip.drop_off_time}</span>
        </div>

        <p className="location">
          {trip.merchant_start_point_name} →{" "}
          {trip.merchant_end_point_name}
        </p>

        <div className="info-row">
          <span>
            ⭐ {trip.transport_information.rating}
          </span>
          <span>Còn {trip.available_seat} chỗ</span>
        </div>

        <div className="price-row">
          <span className="price">
            {trip.fare_amount.toLocaleString()}đ
          </span>
          <button onClick={() => navigate(`/booking/${trip.uuid}`)}>Đặt vé</button>
        </div>
      </div>
    </div>
  );
}
