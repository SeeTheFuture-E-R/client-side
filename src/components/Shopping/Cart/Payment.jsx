
import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { TextField } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";

import { useContext } from "react"
import { AuthContext } from '../../context/authContext'


function Payment({ setCartOpen, handleClose, calcSum }) {
  let { setCurrentUser, setToken, currentUser, token } = useContext(AuthContext);
  // const [open, setOpen] = React.useState(false);
  const [creditNumber, setcreditNumber] = useState("")
  const [idOfCard, setIdOfCard] = useState("")
  const [CVV, setCVV] = useState("")
  const [expiryDate, setExpiryDate] = useState("")

  const toPayment = async () => {
    if(!creditNumber||!idOfCard ||!CVV ||!expiryDate){
      setError(true)
      return
    }
    let cart = localStorage.getItem("cart")
    cart = JSON.parse(cart)
    const date = new Date();
    const purchase = {
      date: date,
      userId: currentUser.id,
      final_price: calcSum,
      purchase_details: cart
    };
    console.log(purchase);
    try {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
      const res = await axios.post(`http://localhost:9660/purchases`, purchase, config)
    }
    catch (err) {

      console.log(err)
    }
    handleClose()
    setCartOpen(false)
    alert("i payments")
  }
  const getProductsFromStorage = () => {
    let cart = localStorage.getItem("cart")

    if (cart != null) {
      cart = JSON.parse(cart)
      return cart
    }
    return []
  }
  const [error, setError] = useState(false)
  return (
 
    <div style={{ width: 500 }}>

      תשלום<br />
      <TableContainer component={Paper} style={{ margin: "8px" }}>
        <Table sx={{ Width: 400 }} aria-label="caption table">

          <TableHead>
            <TableRow>
              <TableCell>שם</TableCell>
              <TableCell align="right">מחיר&nbsp;</TableCell>
              <TableCell align="right">תמונה&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getProductsFromStorage().map((row) => (
              <TableRow key={row.name}>
                <TableCell align="right"> {row.name}</TableCell>
                <TableCell align="right">{((100-currentUser.points)*0.01)*row.price}</TableCell>
                <TableCell align="right">{row.picture}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      מספר כרטיס אשראי<br />
      <TextField error={error && !creditNumber} required style={{ margin: "8px" }} size="small" onChange={(e) => { setcreditNumber(e.target.value) }}></TextField><br />
      תעודת זהות בעל ההכרטיס<br />
      <TextField error={error && !idOfCard} required style={{ margin: "8px" }} onChange={(e) => { setIdOfCard(e.target.value) }}></TextField><br />
      CVV<br />
      <TextField error={error && !CVV} required style={{ margin: "8px" }} onChange={(e) => { setCVV(e.target.value) }}></TextField><br />
      תאריך<br />
      <TextField error={error && !expiryDate} required style={{ margin: "8px" }} onChange={(e) => { setExpiryDate(e.target.value) }}></TextField><br />
      <Button onClick={() => setCartOpen(true)}>לחזור </Button>
      <Button onClick={()=>{toPayment(); handleClose()}}>לסיום</Button>
    </div>

  )
}
export default Payment;
// onClick={handleClose}




