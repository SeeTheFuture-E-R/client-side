
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import SingleProduct from "./Single";
import axios from "axios";

function Products(props) {
    const { search } = useLocation();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("daily");
    const navigate = useNavigate()

    let query = React.useMemo(() => new URLSearchParams(search), [search]);


    const getProductsByCategory = async (category) => {
        try {
            const res = await axios.get(`http://localhost:9660/products/search?category=${category}`);
            setProducts(res.data)
            console.log(products)

        } catch (err) {
            console.log(err)
            //   setErr(err.response.data?.message);
        }
    }

    // const getAllProducts = async () => {
    //     // e.preventDefault();
    //     try {
    //         const res = await axios.get('http://localhost:9660/products');
    //         console.log(res.data)
    //         console.log("hxdbhgsfd")

    //         setProducts(res.data)
    //         console.log(products)

    //     } catch (err) {
    //         console.log(err)
    //         //   setErr(err.response.data?.message);
    //     }
    // }

    useEffect(() => {
        console.log(query.get("category"))
        getProductsByCategory(query.get("category"))
        console.log("ghdfjfhgkjfhg")
    }
        , [])

    return (
        <>
            <Button onClick={() => { setCategory("daily") ; navigate("/shopping?category=daily") }}>יום יום</Button>
            <Button onClick={() => { setCategory("brail") ;navigate("/shopping?category=brail") }}>ברייל</Button>
            <Button onClick={() => { setCategory("medical") ;navigate("/shopping?category=medical") }}>רפואי</Button>
            <Button onClick={() => { setCategory("kitchen") ;navigate("/shopping?category=kitchen") }}>מטבח</Button>
            <Button onClick={() => { setCategory("mobility") ;navigate("/shopping?category=mobility") }}>ניידות</Button>
            <Button onClick={() => { setCategory("ICamera") ;navigate("/shopping?category=ICamera") }}>הפיתוח שלנו</Button>
            {products.map((p) => <SingleProduct product={p}></SingleProduct>)}
        </>
    )
}

export default Products