import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import type { productType } from "../productType";



export const Shop = () => {
    const [products , setProducts] = useState<productType []>([])
    const [loading , setLoading] = useState<Boolean>(false);
    const navigate = useNavigate();
    

    async function fetchItem(){
        const response = await fetch("https://fakestoreapi.com/products")

        const result = await response.json()
        console.log(result)
        setProducts(result)
    }

    useEffect( () => {
        setLoading(true);
        fetchItem()
        setLoading(false);
    }, [])

    if(loading) {
        return(
            <div className="flex justify-center items-center">
                Loading...........
            </div>
        )
    }

    return(
        <div>
            
            <div className="mt-6 mx-4 grid gap-4 grid-cols-2 md:grid-cols-4">
            {
                products.map( (item) => (
                    <div onClick={() => navigate(`/product/${item.id}`)} key={item.id} className="flex flex-col cursor-pointer hover:scale-102 justify-between border rounded-xl w-ful ">
                        <div className="h-32 w-32 p-2 mb-2">
                            <img className="" src={item.image} alt="img" />
                        </div>
                        
                        <div className="pl-2 font-semibold z-4 bg-gray-200">
                            <p>{item.title}</p>
                            <p>Price Rs. {item.price}</p>
                            

                        </div>
                    </div>
                ))
            }
            
        </div>
        </div>
    )
}