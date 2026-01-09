// import "./MovieDetail.css";

const MovieDetailSkeleton: React.FC = () => {
  return (
    <div className="movie-detail skeleton">
      <div className="overlay" />

      <div className="content">
        {/* Poster skeleton */}
        <div className="poster skeleton-box" />

        <div className="info">
          <div className="skeleton-line title" />
          <div className="skeleton-line meta" />
          <div className="skeleton-line overview" />
          <div className="skeleton-line overview short" />

          <div className="buttons">
            <div className="skeleton-btn" />
            <div className="skeleton-btn" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailSkeleton;
