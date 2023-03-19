import { Button } from "@mui/material"
import AddToCart from "./AddToCart"
import DeleteFromCart from './DeleteFromCart'

const SingleProduct = ({ product , button=true, setCount}) => {
    const { name, price, description, company, picture } = product

    
    return (
        <>
            <div>{name}</div>
            <div>{price} ₪</div>
            <div>{description}</div>
            <div>{company}</div>
            <img src={picture}></img>
            {button ? <AddToCart product={product} setCount={setCount}></AddToCart> : <DeleteFromCart productId={product.productId} setCount={setCount}></DeleteFromCart>}
        </>)
}


export default SingleProduct


