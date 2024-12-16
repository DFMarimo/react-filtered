import {useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import axios from "axios";

interface ProductType {
    id: number,
    title: string,
    description: string,
    price: number,
    rating: number,
    images: string[]
}

const ProductPage = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<ProductType | null>();

    useEffect(() => {
        if (id) {
            axios.get<ProductType>(`https://dummyjson.com/products/${id}`).then(res => {
                setProduct(res.data)
            }).catch(error => {
                console.log("Error to fetch product", error)
            })
        }
    }, [id]);

    if (!product) {
        return <h1 className={"block text-center my-4"}>loading ...</h1>
    }

    return <>
        <div className={"p-5 w-[60&]"}>
            <button onClick={() => navigate(-1)}
                    className={"mb-5 px-4 py-2 rounded bg-black text-white capitalize"}>back
            </button>

            <img className={"w-1/2 h-auto mb-5"} src={product.images[0]} alt={product.title}/>

            <h2 className={"text-2xl mb-4 font-bold"}>{product.title}</h2>

            <p className={"mb-4 text-gray-700 w-[70%]"}>{product.description}</p>

            <div className="flex space-x-10">
                <p className={"capitalize"}>Price : $ {product.price}</p>
                <p className={"capitalize"}>rating : {product.rating}</p>
            </div>
        </div>
    </>
}

export default ProductPage