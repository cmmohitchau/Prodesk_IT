"use client"

import { Heart } from "lucide-react";
import { useFavorites } from "../lib/movieContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Favorites() {
  const { favorites } = useFavorites();
  
  const {
  addFavorite,
  removeFavorite,
  isFavorite,
    } = useFavorites();


  const router = useRouter();

  return (
    <div>
      <h1 className="text-3xl text-center font-bold my-6">
        My Favorites
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-4">
        {favorites.map((movie) => {
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
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
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
    </div>
  );
};