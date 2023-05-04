import AddToCart from "./AddToCart"
import DeleteFromCart from '../../Cart/DeleteFromCart'
import { useContext } from "react"
import { AuthContext } from '../../../context/authContext'
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import './product.css'
const SingleProduct = ({ product , setCount}) => {
    const theme = useTheme();

    const { name, price, description, company, picture } = product
    let { currentUser } = useContext(AuthContext);
    const cart = JSON.parse(localStorage.getItem("cart"))
    const cheackInCart=()=>{
      console.log(cart)
      if(cart){
      const isFound = cart.find((element => {
        if(element.productId ==product.productId)
        return true;
        return false;
      }
      ))  
      return isFound }
      return false;
    }
    
    return ( 
        <div class="signalProduct" > 
       {/* <Card sx={{ display: 'flex' ,border}}> */}
       <Box sx={{ display: 'flex',textAlign:'center'}}> 
     <div style={{margin:"30px"}}> <CardMedia
          component="img"
          height="360"
          width="500"
          margin='5'
          image={`http://localhost:9660/images/products/${picture}`}
        /></div>
        <div>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
           {name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {price} ₪
            <br/>  
            {currentUser && currentUser.points > 0? <div>מחיר לאחר הנחה {(100-currentUser.points)*0.01*price} ₪</div>:<></>}<br/>
            {description}
            <br/>
            {company}
          </Typography>
        </CardContent>  
      </div>
      </Box>  
       
      {! cheackInCart()?
 <AddToCart class="bAdd" product={product} setCount={setCount}></AddToCart> : <DeleteFromCart productId={product.productId} setCount={setCount}>להסיר מהעגלה</DeleteFromCart>}
    {/* </Card>*/}
    </div>) 

       }
export default SingleProduct;

