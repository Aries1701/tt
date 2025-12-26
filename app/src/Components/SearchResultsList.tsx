import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

interface SearchResultItem {
  id: number;
  title: string;
  name?: string;
  poster_path: string | null;
}
interface SearchResultsListProps {
  results: SearchResultItem[];
}
export const SearchResultsList: React.FC<SearchResultsListProps> = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((movie) => (
        <SearchResult key={movie.id} result={movie} />
      ))}
    </div>
  );
};
