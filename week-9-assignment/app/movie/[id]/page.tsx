import { fetchMovie } from "@/app/lib/singleMovie";
import { ClientComponent } from "../ClientComponent";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const resolvedParams = await params;
    const id = Number(resolvedParams.id);
    
    const movie = await fetchMovie(id);

  return {
    title: `${movie.title} | Movie App`,
    description: movie.overview,
  };
}

export default async function MovieDetail({
  params,
}: {
  params: Promise<{ id: string }>;
})  {

    const resolvedParams = await params;
    const id = Number(resolvedParams.id);

    const movie = await fetchMovie(id);

    return(
        <ClientComponent movie={movie} />
    )
}