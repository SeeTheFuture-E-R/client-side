
import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { TextField } from "@mui/material";
import { margin } from "@mui/system";
import { ConstructionOutlined } from "@mui/icons-material";
import SingleProduct from "../Products/Single";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Payple from 'payple-react'




function Payment(props){
    const {setCartOpen, handleClose} = props
   // const [open, setOpen] = React.useState(false);
   const [creditNumber, setcreditNumber]=useState("")
   const [idOfCard, setIdOfCard]=useState("")
const [CVV,setCVV]=useState("")
const [expiryDate, setExpiryDate]=useState("")
const data = {
  PCD_CST_ID: 'test',
  PCD_CUST_KEY: 'abcd1234567890',
  PCD_AUTH_URL: 'https://testcpay.payple.kr/php/auth.php',
  PCD_CPAY_VER: '1.0.1',
  PCD_PAY_TYPE: 'transfer',
  PCD_PAY_WORK: 'PAY',
  PCD_PAY_GOODS: '하얀눈',
  PCD_PAY_TOTAL: 11000,
  PCD_PAYER_NO: `payple_${ new Date().getMilliseconds() }`,
  PCD_PAY_ISTAX: 'N',
  PCD_PAYER_EMAIL: 'example@example.com',
  PCD_PAYER_NAME: '김테스트',
  PCD_PAYER_HP: '01012345678'
}
const toPayment=async()=>{
  //handleClose()
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

    return(
    <div style={{width:500}}>
      
       תשלום<br/>
       <TableContainer component={Paper} style={{margin:"8px"}}>
      <Table sx={{ Width: 400}} aria-label="caption table">
       
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
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.picture}</TableCell>
           
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>     
     
      מספר כרטיס אשראי<br />
      <TextField style={{margin:"8px"}} size="small"  onChange={(e) => { setcreditNumber(e.target.value) }}></TextField><br />
      תעודת זהות בעל ההכרטיס<br />
      <TextField style={{margin:"8px"}} onChange={(e) => { setIdOfCard(e.target.value) }}></TextField><br />
      CVV<br />
      <TextField style={{margin:"8px"}}  onChange={(e) => { setCVV(e.target.value) }}></TextField><br />
      תאריך<br />
      <TextField  style={{margin:"8px"}} onChange={(e) => { setExpiryDate(e.target.value) }}></TextField><br />
      <Button onClick={()=>setCartOpen(true)}>לחזור </Button>
      <Button onClick={toPayment}>לסיום</Button>
 
<Payple data={ data } onCallback= { (e)=>console.log(e)  } onClick={handleClose}>
<Button  onClick={()=>{handleClose()}}>
        test
        </Button>
</Payple>
  </div>  
    )
}
export default Payment;
// onClick={handleClose}




