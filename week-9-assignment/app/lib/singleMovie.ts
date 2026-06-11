import axios from "axios";


export async function fetchMovie(id : number) {

    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/single?id=${id}`);

        return res.data;
    } catch(e) {
        console.error(e)
        return;
    }
    
}