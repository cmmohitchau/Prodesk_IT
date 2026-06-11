import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req : NextRequest) {
    try {
            const { searchParams } = new URL(req.url);
            const id = searchParams.get("id");

            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}` , {
                headers : {
                    Authorization : `Bearer ${process.env.NEXT_TMDB_API_KEY}`
                }
            });
    
            return NextResponse.json(response.data);
        } catch(e) {
            console.error(e)
            return;
        }
}