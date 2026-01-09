import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import MovieDetailSkeleton from "./MovieDetailSkeleton";
import "./MovieDetail.css";

// 🔥 Firebase
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase.ts";

interface MovieDetailData {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
}

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<MovieDetailData | null>(null);

  // 🔐 Auth + Favorite
  const [user, setUser] = useState<User | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFav, setLoadingFav] = useState(false);

  // 🔐 Listen auth
  useEffect(() => {
    return onAuthStateChanged(auth, setUser);
  }, []);

  // 🎬 Fetch movie detail
  useEffect(() => {
    const getMovieDetail = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=3cfadd903f1e9863ec5ae80af7becf85`
        );
        const data: MovieDetailData = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie detail:", error);
      }
    };

    if (id) getMovieDetail();
  }, [id]);

  // ❤️ Check favorite
  useEffect(() => {
    if (!user || !movie) return;

    const checkFavorite = async () => {
      const ref = doc(
        db,
        "users",
        user.uid,
        "favorites",
        movie.id.toString()
      );

      const snap = await getDoc(ref);
      setIsFavorite(snap.exists());
    };

    checkFavorite();
  }, [user, movie]);

  // ❤️ Toggle add / remove
  const toggleFavorite = async () => {
    if (!user || !movie) {
      alert("Please login first");
      return;
    }

    setLoadingFav(true);

    const ref = doc(
      db,
      "users",
      user.uid,
      "favorites",
      movie.id.toString()
    );

    try {
      if (isFavorite) {
        await deleteDoc(ref);
        setIsFavorite(false);
      } else {
        await setDoc(ref, {
          movieId: movie.id,
          createdAt: new Date(),
        });
        setIsFavorite(true);
      }
    } catch (err) {
      console.error("Favorite error:", err);
    } finally {
      setLoadingFav(false);
    }
  };

  if (!movie) return <MovieDetailSkeleton />;

  return (
    <div
      className="movie-detail"
      style={{
        backgroundImage: movie.backdrop_path
          ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
          : "none",
      }}
    >
      {/* Back icon */}
      <div className="back-icon" onClick={() => navigate("/")}>
        <FaArrowLeft />
      </div>

      <div className="overlay" />

      <div className="content">
        <img
          className="poster"
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/no-image.png"
          }
          alt={movie.title}
        />

        <div className="info">
          <h1 className="title">{movie.title}</h1>

          <p className="meta">
            ⭐ {movie.vote_average} / 10 &nbsp; | &nbsp; {movie.release_date}
          </p>

          <p className="overview">{movie.overview}</p>

          <div className="buttons">
            <button className="btn play">▶ Watch</button>

            <button
              className="btn add"
              onClick={toggleFavorite}
              disabled={loadingFav}
            >
              {isFavorite ? "✓ Added" : "＋ Add to List"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
