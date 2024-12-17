
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import SingleProduct from "./Single/index";
import axios from "axios";
//import "../Shopping.css"
function Products({ setCount }) {
    const { search } = useLocation();
    const [products, setProducts] = useState([]);

    const category = React.useMemo(() => new URLSearchParams(search), [search]).get("category")


    const getAllProducts = async () => {

        try {
            const res = await axios.get('http://localhost:9660/products');
            console.log(res.data)

            setProducts(res.data)
            console.log(products)

        } catch (err) {
            console.log(err)
            //   setErr(err.response.data?.message);
        }
    }

    useEffect(() => {
        getAllProducts()
    }
        , [])



    return (
        <div id="conteiner-pro">
            {products.map((p) => {if(p.category==category) return <SingleProduct product={p} setCount={setCount}></SingleProduct>})}
        </div >
    )
}

export default Products