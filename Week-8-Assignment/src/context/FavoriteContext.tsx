import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { Movie } from "../popular";

interface FavoritesContextType {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext =
  createContext<FavoritesContextType | null>(null);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const stored = localStorage.getItem("favorites");

    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  const addFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (m) => m.id === movie.id
      );

      if (exists) return prev;

      return [...prev, movie];
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.filter((movie) => movie.id !== id)
    );
  };

  const isFavorite = (id: number) => {
    return favorites.some(
      (movie) => movie.id === id
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider"
    );
  }

  return context;
};