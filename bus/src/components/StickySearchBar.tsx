import "./StickySearchBar.css";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

export default function StickySearchBar() {
  return (
    <div className="sticky-search-wrapper">
      <div className="sticky-search">
        <FaSearch className="icon" />

        <input
          type="text"
          placeholder="Bạn muốn đi đâu?"
          readOnly
        />

        <FaMapMarkerAlt className="icon right" />
      </div>
    </div>
  );
}
