//<!-- <Cart/>
//<Products/> -->

import React, { useState } from "react";
import Products from "./Products/index"
import Categories from "./Categories";
import Cart from "./Cart/Cart";


function Shopping(props) {


    const [count, setCount] = useState(JSON.parse(localStorage.getItem("cart"))?.length || 0)

//const [shopping,setShopping]=useState()
    return (<>
        <Categories></Categories>
        <Cart count={count} setCount={setCount}></Cart>
        <Products setCount={setCount}></Products>
        
    </>
    )
}

export default Shopping