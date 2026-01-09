const TMDB_KEY = "3cfadd903f1e9863ec5ae80af7becf85";

export const getMovieById = async (id: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_KEY}`
  );
  return res.json();
};
