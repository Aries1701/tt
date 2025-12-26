import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState } from "react";

import Movie from "./Components/Movie";
import MovieDetail from "./Components/MovieDetail";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Reset from "./Components/Reset";
import Navbar from "./Components/Navbar";
import NotFound from "./Components/NotFound";

import { SearchBar } from "./Components/SearchBar";
import { SearchResultsList } from "./Components/SearchResultsList";

import "./App.css";

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

  // ✅ CHỈ hiện SearchBar ở trang Home
  const isHomePage = location.pathname === "/";

  return (
    <div className="App">
      <Navbar />

      <div className="search">
        {isHomePage && (
          <div className="search-bar-container">
            <SearchBar setResults={setResults} />
            {results.length > 0 && (
              <SearchResultsList results={results} />
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
