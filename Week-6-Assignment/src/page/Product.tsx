import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useCart } from "../context";
import type { productType } from "../productType";

export const Product = () => {
    const { id }= useParams();

    const [product , setProduct] = useState<productType>()
    const[loading , setLoading] = useState(false);
    const { addToCart } = useCart();

    async function fetchProduct() {
        setLoading(true)
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const result = await response.json()

        setProduct(result)
        setLoading(false)
    }

    useEffect( () => {
        fetchProduct()
        
    }, [id])

    if(loading) {
        return(
            <div>
                Loading...
            </div>
        )
    }
    return(
        <div className="min-h-screen flex gap-4 justify-center">
            <div className="flex flex-col justify-center">
                <div className="flex w-full">
                    <div className="w-1/4">
                    <img src={product?.image} alt="img" className="object-cover" />
                    </div>
                    <div className="flex flex-col gap-4 w-2/4 mt-8 ml-4">
                        <div className="text-2xl font-bold">{product?.title}</div>
                        <div className="font-semibold">{product?.description}</div>
                        <div className="text-2xl font-semibold" >{product?.category}</div>
                        <div className="text-2xl font-bold">{product?.price}</div>
                        <button className="border rounded-xl w-fit px-4 py-3 bg-green-400 hover:bg-green-600" onClick={() => addToCart(product!)}>Add to Cart</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}