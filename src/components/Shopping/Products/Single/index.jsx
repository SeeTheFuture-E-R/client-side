import AddToCart from "./AddToCart"

const SingleProduct = ({ product }) => {
    const { name, price, description, company, picture } = product

    return (
        <>
            <div>{name}</div>
            <div>{price} ₪</div>
            <div>{description}</div>
            <div>{company}</div>
            <img src={picture}></img>
            <AddToCart product={product}/>
        </>)
}


export default SingleProduct