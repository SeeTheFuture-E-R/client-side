
import Button from '@mui/material/Button';
import DeleteFromCart from "./DeleteFromCart";
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { AuthContext } from '../../context/authContext'
import { useContext } from "react"
import {  useNavigate } from "react-router-dom";

function Details({setCartOpen,handleClose, calcSum, setCount}){
    let { setCurrentUser, setToken, currentUser, token } = useContext(AuthContext);
    const navigate = useNavigate()

    const getProductsFromStorage = () => {
        let cart = localStorage.getItem("cart")

        if (cart != null) {
            cart = JSON.parse(cart)
            return cart
        }
        return []
    }
    const cheakCurrentUser=()=>{
      if (currentUser)
      setCartOpen(false)
      else
      navigate("/Login")
    }
   
    return(<>
<h2>העגלה שלך"</h2>
סכום כולל: {calcSum} ₪
{getProductsFromStorage().map(p => <div style={{"border-color": "black",
            "border":"30px",
            "border-style": "solid,5px",
            "border-color": "black",
            "margin":"30px",
            }}>
    <Typography component="div" variant="h5">
           {p.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {p.price} ₪
            <br/>  
            {currentUser && currentUser.points > 0? <div>מחיר לאחר הנחה {(100-currentUser.points)*0.01*p.price} ₪</div>:<></>}<br/>
            {p.description}
            <br/>
            {p.company}
          </Typography><CardMedia
          component="img"
          height="80"
          width="150"
          margin='5'
          image={`http://localhost:9660/images/products/${p.picture}`}
        />
        <DeleteFromCart productId={p.productId} setCount={setCount}></DeleteFromCart>
        </div>)}
{/* <SingleProduct product={p} button={false} setCount={setCount} style={{"width":"100px"}}></SingleProduct>)} */}
<Button onClick={handleClose}>סגור</Button> 
<Button onClick={()=>cheakCurrentUser()}>לשלם</Button>
</>
)
}
export default Details

