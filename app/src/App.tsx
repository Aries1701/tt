import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState } from "react";

import Movie from "./components/Movie";
import MovieDetail from "./components/MovieDetail";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Reset from "./components/Reset";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";

import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList";

import "./App.css";
import MovieList from "./components/MovieList";

/* ===== Types ===== */
interface SearchResultItem {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
}

const Layout: React.FC = () => {
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const location = useLocation();

  // ✅ Chỉ hiện SearchBar ở trang Home
  const isHomePage = location.pathname === "/";

  // ✅ Lọc chỉ các item có title
  const filteredResults = results.filter((item) => item.title);

  return (
    <div className="App">
      <Navbar />

      <div className="search">
        {isHomePage && (
          <div className="search-bar-container">
            <SearchBar setResults={setResults} />
            {filteredResults.length > 0 && (
              <SearchResultsList results={filteredResults} />
            )}
          </div>
        )}
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/list" element={<MovieList />} />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
