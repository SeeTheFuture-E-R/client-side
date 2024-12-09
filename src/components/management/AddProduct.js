import { Button, Input, TextField,  MenuItem} from '@mui/material';
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

 const categories = [
    { value: 'mobility', label: 'ניידות' },
    { value: 'kitchen', label: 'מטבח' },
    { value: 'medical', label: 'רפואי' },
    { value: 'daily', label: 'יומיומי' },
    { value: 'brail', label: 'ברייל' }
  ];

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
            <TextField
                select
                fullWidth
                label="קטגוריה"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                variant="outlined"
                dir="rtl"
                sx={{ 
                    width: '20%',  // or any percentage you prefer
                    mb: 2 
                  }}
                >
                {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <Uploader file={image} setFile={setImage}></Uploader>
        <br/>
        <Button full onClick={addProduct}>שמור</Button>
      </div>
    )
}
export default AddProduct;