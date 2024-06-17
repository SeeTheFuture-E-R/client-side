import { Button, Input } from '@mui/material';
import Uploader from '../Uploader'
import axios from "axios";
import { useState, useContext  } from "react"
import { AuthContext } from "../context/authContext"
import ListProduct from './ListProduct';

function AddProduct({products, setProducts}){
 const [name, setName]=useState()
 const [price, setPrice]=useState()
 const [description, setDescription]=useState()
 const [comp, setComp]=useState()
 const [image, setImage]=useState()
 const [category, setCategory]=useState()
 let {token } = useContext(AuthContext);
 const addProduct=async()=>{
    try {
        const Product = {
            name: name,
            description: description,
            price: parseInt(price),
            company: comp,
            category:category
        };
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        const res = await axios.post('http://localhost:9660/products', Product, config);
        const picture=await axios.post(`http://localhost:9660/products/${res.data.productId}`, 
        image, { headers: { 'Authorization': 'Bearer ' + token, "Content-Type": "multipart/form-data" } })
        res.data.picture = picture.data.name
        setProducts([...products,res.data])
    }
    catch (err) {
        console.log(err)
        //   setErr(err.response.data?.message);
    }
 }
    return( 
        <div>
        <br />
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="הכנס שם מוצר" />
            <Input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="הכנס מחיר" />
            <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="הכנס תאור" />
            <Input type="text" value={comp} onChange={(e) => setComp(e.target.value)} placeholder="הכנס חברה" />
            <Input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="הכנס שם קטגוריה" />
            <Uploader file={image} setFile={setImage}></Uploader>
        <br/>
        <Button onClick={addProduct}>שמור</Button>
      </div>
    )
}
export default AddProduct;