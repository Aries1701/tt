import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./movie.css";


interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

 const Movie: React.FC = () => {
    const [movieList, setMovieList] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=3cfadd903f1e9863ec5ae80af7becf85");
                const data = await res.json();
                setMovieList(data.results);
            } catch (error) {
                console.error("Failled to fetch  movies", error);
            }
        };

        fetchMovie();
        }, []);
    
    // const getMovies = async () => {
    //     try {
    //         const res = await fetch(
    //             "https://api.themoviedb.org/3/discover/movie?api_key=3cfadd903f1e9863ec5ae80af7becf85"
    //         );
    //         const data = await res.json();
    //         setMovieList(data.results);
    //     } catch (error) {
    //         console.error("Failled to fetching movies:", error);
    //     }
    // };

    // useEffect(() => {
    //     getMovies();
    // }, []);

    return (
        <div className="movie-grid">
            {movieList.map((movie) => (
                <Link
                    to={`/movie/${movie.id}`}
                    key={movie.id}
                    className="movie-card"
                >
                    <img
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/no-image.png"}
                        alt={movie.title}
                    />
                    <p className="movie-title">{movie.title}</p>
                </Link>
            ))}
        </div>
    );
}

export default Movie;
