import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
// import { useLocation } from "react-router-dom";
import "./SearchBar.css";

/* ===== Types ===== */
interface TmdbMovieItem {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
}


interface SearchBarProps {
  setResults: React.Dispatch<React.SetStateAction<TmdbMovieItem[]>>;
}

interface TmdbSearchResponse {
  results: TmdbMovieItem[];
}


export const SearchBar: React.FC<SearchBarProps> = ({ setResults }) => {
  const [input, setInput] = useState("");
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  // const location = useLocation();

  const fetchData = async (value: string): Promise<void> => {
    if (!value.trim()) return;

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=3cfadd903f1e9863ec5ae80af7becf85&query=${value}`
      );

      const json: TmdbSearchResponse = await res.json();

const normalizedResults: TmdbMovieItem[] = json.results.map((item) => ({
  id: item.id,
  title: item.title ?? item.name ?? "Unknown",
  poster_path: item.poster_path ?? null,
}));



      setResults(normalizedResults);
    } catch {
      setResults([]);
    }
  };

  const handleChange = (value: string): void => {
    setInput(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    fetchData(value);
  };

  // // reset khi đổi route
  // useEffect(() => {
  //   setInput("");
  //   setResults([]);
  // }, [location.pathname, setResults]);

  // click outside
  useEffect(() => {
  const handleClickOutside = (e: MouseEvent): void => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(e.target as Node)
    ) {
      setResults([]);
    }
  };

  document.addEventListener("click", handleClickOutside);
  return () =>
    document.removeEventListener("click", handleClickOutside);
}, [setResults]);


  return (
    <div ref={wrapperRef} className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

