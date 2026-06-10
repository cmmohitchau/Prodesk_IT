import ClientComponent from "./ClientComponent";
import { getPopularMovies } from "./lib/tmdb";


type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function Home({ searchParams }: Props) {
  const { page = "1" } = await searchParams;

  const movies = await getPopularMovies(page);

  return <ClientComponent movies={movies} />;
}