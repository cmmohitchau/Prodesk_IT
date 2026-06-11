import axios from "axios";

export async function searchMovie(searchText : string) {
    
    try {
        const res = await axios.get(`/api/search?query=${encodeURIComponent(searchText)}`)

        return await res.data;

    } catch(e) {
        console.error(e)
        return;
    }
}