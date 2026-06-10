"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useFavorites } from "./lib/movieContext";
import { Heart } from "lucide-react";
import { getPopularMovies } from "./lib/tmdb";
import Image from "next/image";


export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  adult: boolean;
  release_date: string;
  vote_average: number;
}

type Props = {
  movies: {
    page: number;
    results: Movie[];
    total_pages: number;
  };
};

export default function ClientComponent({ movies }: Props) {
  const [movieList, setMovieList] = useState(movies.results);
  const [page, setPage] = useState(movies.page);
  const [loading, setLoading] = useState(false);
  const [hasMore , setHasMOre] = useState(true);
  const observeRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const {
        addFavorite,
        removeFavorite,
        isFavorite} = useFavorites(); 

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (
          !entry.isIntersecting ||
          loading ||
          page >= movies.total_pages
        ) {
          return;
        }

        setLoading(true);

        try {
          const res = await fetch(`/api/popular?page=${page + 1}`);
          const json = await res.json();

          setMovieList(prev => [...prev, ...json.data.results]);
          setPage(json.data.page);
        } finally {
          setLoading(false);
        }
      },
      {
        threshold: 0,
      }
    );

    const node = observeRef.current;

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [loading, page, movies.total_pages]);

    return (
    <div>
      <h1 className="text-3xl mt-4 flex justify-center font-bold mb-4">
        Popular Movies
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-4">
        {movieList.map((movie) => {
        const favorite = isFavorite(movie.id);

  return (
    <div
      key={movie.id}
      onClick={() => router.push(`/movie/${movie.id}`)}
      className="border rounded-md cursor-pointer hover:shadow-lg transition-shadow relative"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();

          if (favorite) {
            removeFavorite(movie.id);
          } else {
            addFavorite(movie);
          }
        }}
        className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md"
      >
        <Heart
          size={20}
          fill={favorite ? "red" : "none"}
          className={
            favorite
              ? "text-red-500"
              : "text-gray-500"
          }
        />
      </button>

      <div className="relative w-full aspect-2/3">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          fill
          className="rounded-t-md object-cover"
          loading="lazy"
          sizes="(max-width: 768px) 100vw,
                (max-width: 1024px) 50vw,
                25vw"
        />
      </div>

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
  );
})}
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
        className="h-20 "
      />
    </div>
  );
}