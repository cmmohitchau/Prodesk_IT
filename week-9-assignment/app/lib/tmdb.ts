// lib/tmdb.ts
import axios from "axios";

export async function getPopularMovies(page = "1") {
  const res = await axios.get(
    `http://localhost:3000/api/popular?page=${page}`
  );
  
  return res.data.data;
}