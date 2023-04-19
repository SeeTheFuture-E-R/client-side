
import SingleProduct from "../Products/Single"
import Button from '@mui/material/Button';
function Details({setCartOpen,handleClose, calcSum, setCount}){
    const getProductsFromStorage = () => {
        let cart = localStorage.getItem("cart")

        if (cart != null) {
            cart = JSON.parse(cart)
            return cart
        }
        return []
    }
   
    return(<>
<h2>העגלה שלך"</h2>
סכום כולל: {calcSum} ₪
{getProductsFromStorage().map(p => <SingleProduct product={p} button={false} setCount={setCount}></SingleProduct>)}
<Button onClick={handleClose}>סגור</Button> 
<Button onClick={()=>setCartOpen(false)}>לשלם</Button>
</>
)
}
export default Details