
import { Button } from "@mui/material"

function AddToCart({product, setCount}) {

    const changeStorage = () => {
        let cart = localStorage.getItem("cart")

        if (cart != null) {
            cart = JSON.parse(cart)
            cart = [...cart,  product]
        }
        else {
            cart = [product]
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        setCount(cart.length)
    }

    return(        
       <Button onClick={changeStorage}>הוספה לעגלה{console.log("nnnnnnnnnnnnnnnnnnnnnnnn")}</Button>
        )
}

export default AddToCart