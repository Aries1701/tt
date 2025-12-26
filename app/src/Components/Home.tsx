import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?api_key=3cfadd903f1e9863ec5ae80af7becf85";

const IMG_URL = "https://image.tmdb.org/t/p/w500";

/* dữ liệu Movie từ TMDB */
interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  popularity: number;
  release_date?: string;
}

/* response API */
interface MovieResponse {
  results: Movie[];
}

const Home: React.FC = () => {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [newRelease, setNewRelease] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data: MovieResponse) => {
        const movies = data.results;

        // Trending Now - popularity
        const trendingMovies = [...movies]
          .sort((a, b) => b.popularity - a.popularity)
          .slice(0, 6);

        // New Release - release_date
        const newReleaseMovies = [...movies]
          .filter((movie) => movie.release_date)
          .sort(
            (a, b) =>
              new Date(b.release_date!).getTime() -
              new Date(a.release_date!).getTime()
          )
          .slice(0, 6);

        setTrending(trendingMovies);
        setNewRelease(newReleaseMovies);
      });
  }, []);

  return (
    <div className="home">
      {/* TRENDING */}
      <section className="row">
        <h2>Trending Now</h2>
        <div className="movie-row">
          {trending.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="movie-card"
            >
              {movie.poster_path && (
                <img
                  src={`${IMG_URL}${movie.poster_path}`}
                  alt={movie.title}
                />
              )}
              <p className="movie-title">{movie.title}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW RELEASE */}
      <section className="row">
        <h2>New Release</h2>
        <div className="movie-row">
          {newRelease.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="movie-card"
            >
              {movie.poster_path && (
                <img
                  src={`${IMG_URL}${movie.poster_path}`}
                  alt={movie.title}
                />
              )}
              <p className="movie-title">{movie.title}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
