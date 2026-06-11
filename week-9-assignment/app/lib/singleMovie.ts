import axios from "axios";


export async function fetchMovie(id : number) {

    try {
        const res = await axios.get(`/api/single?id=${id}`);

        return res.data;
    } catch(e) {
        console.error(e)
        return;
    }
    
}