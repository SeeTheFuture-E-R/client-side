
import SingleProduct from "../Products/Single"
import Button from '@mui/material/Button';
function Details({setCartOpen,handleClose}){
    const getProductsFromStorage = () => {
        let cart = localStorage.getItem("cart")

        if (cart != null) {
            cart = JSON.parse(cart)
            return cart
        }
        return []
    }
    const calcSum = () => {
        let cart = localStorage.getItem("cart")
        if (cart != null) {
            cart = JSON.parse(cart)
            let sum = 0
            cart.forEach(e => {
                sum += parseInt(e.price);
                console.log(e.price)
            });
            return sum

        }
        return 0
    }
    return(<>
<h2>העגלה שלך"</h2>
סכום כולל: {calcSum()} ₪
{getProductsFromStorage().map(p => <SingleProduct product={p} button={false}></SingleProduct>)}
<Button onClick={handleClose}>סגור</Button> 
<Button onClick={()=>setCartOpen(false)}>לשלם</Button>
</>
)
}
export default Details