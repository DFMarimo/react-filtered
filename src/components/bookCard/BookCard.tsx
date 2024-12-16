import * as React from "react";
import {Link} from "react-router";

interface BookCardProps {
    id: number
    title: string
    price: number
    image: string
}

const BookCard: React.FC<BookCardProps> = ({id, price, image, title}) => {
    return <div className={"border p-4 rounded"}>
        <Link to={`/product/${id}`}>
            <img src={image} alt={title} className={"w-full h-32 object-cover mb-2"}/>
            <h2 className={"font-bold"}>{title}</h2>
            <p>$ {price}</p>
        </Link>
    </div>

}

export default BookCard;