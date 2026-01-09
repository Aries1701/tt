import type { Trip } from "../types/Trip";
import { useNavigate } from "react-router-dom";
import "./TripItemCard.css";
import { doc, setDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { useUserProfile } from "../hooks/useUserProfile";
import icArrow from "../assets/ic_arrow.svg";
import heartIcon from "../assets/ic_heart.svg";
import heartSelectIcon from "../assets/ic_heart_selected.svg"; 

export default function TripItemCard({ trip }: { trip: Trip }) {
  const profile = useUserProfile();
  const navigate = useNavigate();
  const isFavorite = profile?.favorites?.includes(trip.uuid);

  const toggleFavorite = async () => {
    if (!auth.currentUser) {
      alert("Vui lòng đăng nhập");
      return;
    }
    const ref = doc(db, "users", auth.currentUser.uid);
    await setDoc(ref, {
        favorites: isFavorite ? arrayRemove(trip.uuid) : arrayUnion(trip.uuid),
      }, { merge: true }
    );
  };

  return (
    <div className="trip-item">
      {/* Header: Time & Duration */}
      <div className="trip-header">
        <span className="departure-time">{trip.departure_time} {trip.departure_date}</span>
        <span className="duration">{Math.floor(trip.duration_in_min / 60)} giờ {trip.duration_in_min % 60} phút</span>
      </div>

      {/* Route Box */}
      <div className="trip-route-container">
        <div className="trip-route">
          <span className="station-name">{trip.merchant_start_point_name}</span>
          <div className="route-line">
            <span className="dot"></span>
            <span className="line"></span>
            <img src={icArrow} alt="arrow" />
            <span className="line"></span>
            <span className="dot"></span>
          </div>
          <span className="station-name">{trip.merchant_end_point_name}</span>
        </div>
      </div>

      {/* Provider Info */}
      <div className="trip-provider">
        <div className="provider-left">
          <img className="provider-logo" src={trip.transport_information.image_url} alt="" />
          <div className="provider-text">
            <strong>{trip.transport_information.name}</strong>
            <p className="policy-link">Chi tiết quy định</p>
          </div>
        </div>

        <div className="provider-right">
          <div className="rating-row">
            <span className="star">⭐ {trip.transport_information.rating}</span>
            <img
              src={isFavorite ? heartSelectIcon : heartIcon}
              className="favorite-icon"
              onClick={toggleFavorite}
              alt="favorite"
            />
          </div>
          <p className="vehicle-type">{trip.vehicle_name}</p>
        </div>
      </div>

      {/* Footer (Dashed Divider above) */}
      <div className="trip-footer">
        <div className="price-info">
          <span className="price-label">Từ </span>
          <span className="price-value">{trip.fare_amount.toLocaleString()}đ</span>
          <p className="seats-left">Chỉ còn {trip.available_seat} chỗ trống</p>
        </div>

        <button className="btn-next" onClick={() => navigate(`/booking/${trip.uuid}`)}>
          Tiếp tục
        </button>
      </div>
    </div>
  );
}