import "./SearchResult.css";
import { Link } from "react-router-dom";

interface SearchResultItem {
  id: number;
  title: string;
  name?: string;
  poster_path: string | null;
}

interface SearchResultProps {
  result: SearchResultItem;
}

export const SearchResult: React.FC<SearchResultProps> = ({ result }) => {
  return (
    <Link
      to={`/movie/${result.id}`}
      className="search-result-item"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <img
        className="result-image"
        src={
          result.poster_path
            ? `https://image.tmdb.org/t/p/w200${result.poster_path}`
            : "/no-image.png"
        }
        alt={result.title || result.name || "Movie poster"}
      />

      <span className="result-title">
        {result.title || result.name || "Untitled"}
      </span>
    </Link>
  );
};
