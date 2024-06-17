
import { useState, useContext  } from "react"
import { AuthContext } from "../context/authContext"
import ListProduct from './ListProduct';
import AddProduct from './AddProduct';

function Management(){
    const [products, setProducts]=useState([])
 let {token } = useContext(AuthContext);
 
    return( 
        <div>
            <ListProduct products={products} setProducts={setProducts}  ></ListProduct>
            <AddProduct products={products} setProducts ={setProducts} ></AddProduct>
        </div>
    )
}
export default Management;