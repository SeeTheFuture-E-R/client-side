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
      <div className="product-wrapper" role="article" aria-label={`מוצר: ${name}`}>
          <div className="product-content">
              <div className="product-image-container">
                  <img
                      src={`http://localhost:9660/images/products/${picture}`}
                      alt={`תמונה של ${name}`}
                      className="product-image"
                  />
              </div>
              
              <div className="product-details">
    <h2 className="product-title">{name}</h2>
    
    <div className="product-info">
        <p className="product-price">
            <span className="price-text">{price} ₪</span>
        </p>
        
        {currentUser && currentUser.points > 0 && (
            <p className="discounted-price">
                <span className="price-text">
                    מחיר לאחר הנחה {(100-currentUser.points)*0.01*price} ₪
                </span>
            </p>
        )}
        
        <p className="product-description">
            <span className="description-text">{description}</span>
        </p>
        
        <p className="product-company">
            <span className="company-text">{company}</span>
        </p>
    </div>
</div>
          </div>

          <div className="product-actions">
              {!cheackInCart() ? (
                  <AddToCart 
                      className="action-button add-button" 
                      product={product} 
                      setCount={setCount}
                      aria-label="הוסף לעגלה"
                  />
              ) : (
                  <DeleteFromCart 
                      className="action-button remove-button"
                      productId={product.productId} 
                      setCount={setCount}
                      aria-label="הסר מהעגלה"
                  >
                      להסיר מהעגלה
                  </DeleteFromCart>
              )}
          </div>
      </div>
  );

}
export default SingleProduct;

