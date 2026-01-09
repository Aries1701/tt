import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, type User } from "firebase/auth";

import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { getMovieById } from "../utils/tmdb";
import "./movielist.css";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function MovieList() {
  const [user, setUser] = useState<User | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  const navigate = useNavigate(); // ✅ thêm navigate

  // 🔐 Auth
  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  // 📥 Load favorite ids
  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const snap = await getDocs(
        collection(db, "users", user.uid, "favorites")
      );

      const ids = snap.docs.map(d => d.data().movieId as number);
      setFavoriteIds(ids);

      const movieData = await Promise.all(ids.map(id => getMovieById(id)));
      setMovies(movieData);
    };

    load();
  }, [user]);

  // ❤️ Toggle favorite
  const toggleFavorite = async (movieId: number) => {
    if (!user) return;

    const ref = doc(
      db,
      "users",
      user.uid,
      "favorites",
      movieId.toString()
    );

    if (favoriteIds.includes(movieId)) {
      await deleteDoc(ref);
      setFavoriteIds(ids => ids.filter(id => id !== movieId));
      setMovies(m => m.filter(movie => movie.id !== movieId));
    } else {
      await setDoc(ref, { movieId });
      setFavoriteIds(ids => [...ids, movieId]);

      const movie = await getMovieById(movieId);
      setMovies(m => [...m, movie]);
    }
  };

  if (!user) return <p>Please login first</p>;

  return (
    <div className="home favorites-page">
      <div className="row">
        <h2>Favorites</h2>

        <div className="movie-row">
          {movies.map(movie => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => navigate(`/movie/${movie.id}`)} // ✅ click card → detail
            >
              <div className="poster-wrapper">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />

                <button
                  className="favorite-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // ⛔ chặn navigate
                    toggleFavorite(movie.id);
                  }}
                >
                  {favoriteIds.includes(movie.id) ? "❤️" : "🤍"}
                </button>
              </div>

              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
