import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBus,
  FaTicketAlt,
  FaUser,
} from "react-icons/fa";
import "./BottomBar.css";

export default function BottomBar() {
  return (
    <nav className="bottom-bar">
      <NavLink to="/" className="tab">
        <FaHome />
        <span>Trang chủ</span>
      </NavLink>

      <NavLink to="/trips" className="tab">
        <FaBus />
        <span>Chuyến xe</span>
      </NavLink>

      <NavLink to="/tickets" className="tab">
        <FaTicketAlt />
        <span>Vé của tôi</span>
      </NavLink>

      <NavLink to="/profile" className="tab">
        <FaUser />
        <span>Tài khoản</span>
      </NavLink>
    </nav>
  );
}
