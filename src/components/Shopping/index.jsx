import React, { useState } from "react";
import Products from "./Products/index"
import Categories from "./Categories";
import Cart from "./Cart/Cart";
import "./Shopping.css"

function Shopping(props) {


    const [count, setCount] = useState(JSON.parse(localStorage.getItem("cart"))?.length || 0)

    return (<div id="conteiner"> 
    <Cart count={count}  fontSize="large" style={{margin:"15px"}} setCount={setCount}></Cart>
        <Products id="products" setCount={setCount}></Products> 
       
        <Categories id="categories"></Categories>
       
    </div>
    )
}

export default Shopping