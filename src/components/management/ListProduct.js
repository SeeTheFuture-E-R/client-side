import axios from "axios";
import { useEffect, useContext  } from "react"
import { AuthContext } from "../context/authContext"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function ListProduct({products, setProducts}){
 let {token } = useContext(AuthContext);
    const getProducts=async()=>{
        try {
            const res = await axios.get('http://localhost:9660/products', {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            });
            setProducts(res.data)
            console.log('Response:', res.data);
        } catch (err) {
            console.error('Error:', err);
        } 
    } 
    const deleteProduct=async(productId, i)=>{
        try {
            const res = await axios.delete(`http://localhost:9660/products/${productId}`, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response:', res.data);
            products.pop(i)
            setProducts([...products])
            alert("res", res.data)
        } catch (err) {
            console.error('Error:', err);
        } 
    }
 useEffect(()=>{
        getProducts()
    },[])

   return ( 
    <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 , maxWidth:700}} aria-label="simple table">
        <TableHead>
          <TableRow>  
            <TableCell>מזהה</TableCell>
            <TableCell align="right">שם </TableCell>
            <TableCell align="right">קטגוריה</TableCell>
            <TableCell align="right">מחיר</TableCell>
            <TableCell align="right">תאור</TableCell>
            <TableCell align="right">חברה</TableCell>
            <TableCell align="right">מחק</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row, i) => (
            <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{row.productId}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.company}</TableCell>
              <TableCell align="right"> <FontAwesomeIcon icon={faTrash} fontSize={"20px"} onClick={() => deleteProduct(row.productId, i)} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
);
}

export default ListProduct;