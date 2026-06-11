// lib/tmdb.ts
"use client"
import axios from "axios";

export async function getPopularMovies(page = "1") {
  const res = await axios.get(`/api/popular?page=${page}`);
  
  return res.data.data;
}