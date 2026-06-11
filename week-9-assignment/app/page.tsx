import axios from "axios";
import ClientComponent from "./ClientComponent";
import { getPopularMovies } from "./lib/tmdb";


type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function Home({ searchParams }: Props) {
  const { page = "1" } = await searchParams;

  const res = await axios.get(`/api/popular?page=${page}`);
  
  const movies =  res.data.data;


  return <ClientComponent movies={movies} />;
}