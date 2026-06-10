// app/api/search/route.ts
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  const response = await axios.get(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: { query },
      headers: {
        Authorization: `Bearer ${process.env.NEXT_TMDB_API_KEY}`,
      },
    }
  );

  return NextResponse.json(response.data);
}