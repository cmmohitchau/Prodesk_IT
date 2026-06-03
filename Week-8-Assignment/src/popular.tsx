import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  adult: boolean;
  release_date: string;
  vote_average: number;
}

export const Popular = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();
  const observeRef = useRef<HTMLDivElement | null>(null);

  const getData = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular`,
        {
          params: {
            language: "en-US",
            page,
          },
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          },
        }
      );

      const newMovies = res.data.results;

      setMovies((prev) => [...prev, ...newMovies]);

      if (page >= res.data.total_pages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (
          entry.isIntersecting &&
          !loading &&
          hasMore
        ) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0.1,
      }
    );

    const current = observeRef.current;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [loading, hasMore]);

  return (
    <div>
      <h1 className="text-3xl mt-4 flex justify-center font-bold mb-4">
        Popular Movies
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="border rounded-md cursor-pointer hover:shadow-lg transition-shadow"
          >
            <img
              className="rounded-t-md w-full"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />

            <div className="px-2 py-2 text-sm">
              <h2 className="text-lg font-bold">
                {movie.title}
              </h2>

              <p className="text-gray-600">
                {movie.overview.slice(0, 100)}...
              </p>

              <p className="text-green-700 font-bold">
                Release Date: {movie.release_date}
              </p>

              <p className="text-yellow-500 font-bold">
                Rating: {movie.vote_average.toFixed(1)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="text-center py-6 text-lg">
          Loading more movies...
        </div>
      )}

      {!hasMore && (
        <div className="text-center py-6 text-gray-500">
          No more movies to load.
        </div>
      )}

      <div
        ref={observeRef}
        className="h-10"
      />
    </div>
  );
};