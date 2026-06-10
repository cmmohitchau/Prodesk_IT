// lib/tmdb.ts
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {

      try {
        const { searchParams } = new URL(req.url);
        const page = searchParams.get("page");
    
        const res = await axios.get(
            "https://api.themoviedb.org/3/movie/popular",
            {
            params: {
                language: "en-US",
                page,
            },
            headers: {
                Authorization: `Bearer ${process.env.NEXT_TMDB_API_KEY}`,
            },
            }
        );

        return NextResponse.json({
            data : res.data
        });
    } catch(e) {
        console.error(e);
        return;
    }
}