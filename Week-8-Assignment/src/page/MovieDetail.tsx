import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Movie } from "../popular";
import { Heart } from "lucide-react"
import { useFavorites } from "../context/FavoriteContext";

export const MovieDetail = () => {

    const { id } = useParams();
    const [movie, setMovie] = useState<null | Movie>(null);
    
      const {
      addFavorite,
      removeFavorite,
      isFavorite,
        } = useFavorites();

    const favorite = isFavorite(Number(id));
    
    async function getMovieDetails() {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}` , {
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
            }
        })
        setMovie(res.data);  
        }

    useEffect(() => {
        getMovieDetails();
    }, [id])

    return (
        <div>
            <h1 className="text-3xl mt-4 flex justify-center font-bold mb-4">Movie Detail</h1>
            {movie && (
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
                    <img loading="lazy" className="rounded-md cover w-1/2 mx-auto mb-4" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                    <div className="gap-2 px-2 py-2 flex flex-col lg:justify-center rounded-full text-sm lg:text-lg">
                        <h2 className="text-lg font-bold">{movie.title}</h2>
                        <p className="text-gray-600">{movie.overview}</p>
                        <p className="text-green-700 font-bold">Release Date: {movie.release_date}</p>
                        <p className="text-yellow-500 font-bold">Rating: {movie.vote_average.toFixed(1)}</p>
                        <button
                            onClick={(e) => {
                            e.stopPropagation();

                            if (favorite) {
                                removeFavorite(movie.id);
                            } else {
                                addFavorite(movie);
                            }
                            }}
                            className=" bg-white rounded-full w-fit p-2 shadow-md"
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
                    </div>
                </div>
            )}
        </div>
    )
}