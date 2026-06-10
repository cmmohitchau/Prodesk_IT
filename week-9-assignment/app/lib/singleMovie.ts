import axios from "axios";


export async function fetchMovie(id : number) {

    try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}` , {
            headers : {
                Authorization : `Bearer ${process.env.NEXT_TMDB_API_KEY}`
            }
        });

        return res.data;
    } catch(e) {
        console.error(e)
        return;
    }
    
}