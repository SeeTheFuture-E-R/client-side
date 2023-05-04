
import SingleProduct from "../Products/Single/index"
import Button from '@mui/material/Button';
import DeleteFromCart from "./DeleteFromCart";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { AuthContext } from '../../context/authContext'
import { useContext } from "react"

function Details({setCartOpen,handleClose, calcSum, setCount}){
    let { setCurrentUser, setToken, currentUser, token } = useContext(AuthContext);
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
<Button onClick={()=>setCartOpen(false)}>לשלם</Button>
</>
)
}
export default Details

