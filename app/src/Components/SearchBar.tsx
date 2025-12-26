import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import "./SearchBar.css";

/* ===== Types ===== */
interface MovieSearchItem {
  id: number;
  title: string;
  poster_path: string | null;
}

interface SearchBarProps {
  setResults: React.Dispatch<React.SetStateAction<MovieSearchItem[]>>;
}

export const SearchBar: React.FC<SearchBarProps> = ({ setResults }) => {
  const [input, setInput] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const fetchData = async (value: string): Promise<void> => {
    if (!value.trim()) return;

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=3cfadd903f1e9863ec5ae80af7becf85&query=${value}`
      );
      const json: { results: MovieSearchItem[] } = await res.json();
      setResults(json.results || []);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    }
  };

  const handleChange = (value: string): void => {
    setInput(value);

    if (!value.trim()) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setShowResults(true);
    fetchData(value);
  };

  // ✅ RESET KHI ĐỔI ROUTE
  useEffect(() => {
    setShowResults(false);
    setInput("");
    setResults([]);
  }, [location.pathname, setResults]);

  // ✅ Click ra ngoài → ẩn dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="input-wrapper">
      <FaSearch id="search-icon" />

      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value)
        }
        onFocus={() => input.trim() && setShowResults(true)}
      />

      {showResults && input.trim() && (
        <div className="results-dropdown" />
      )}
    </div>
  );
};
