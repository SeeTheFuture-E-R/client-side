import { Button } from "@mui/material"

function DeleteFromCart({ productId , setCount}) {
    
    const deleteProduct = () => {
        let cart = localStorage.getItem("cart")

        if (cart != null) {
            cart = JSON.parse(cart)
            cart = cart.filter(p => p.productId != productId)
            //filter((x) => x === undefined));
            console.log(cart)
            if (cart.length == 0)
                localStorage.removeItem("cart");
            else
                localStorage.setItem("cart", JSON.stringify(cart));
        }
        console.log(setCount)
        setCount(cart.length)
    }

    return (
        <Button onClick={deleteProduct}>❌</Button>
    )
}
export default DeleteFromCart