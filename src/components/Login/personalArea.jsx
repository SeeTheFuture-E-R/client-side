import { useEffect } from "react"
import { Button } from "@mui/material"
import TextField from '@mui/material/TextField';
import { useContext } from "react"
import { AuthContext } from '../context/authContext'
import axios from "axios";
import SingleBook from "../Books/single";
import { Start } from "@mui/icons-material";
import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Accordion from '@material-ui/core/Accordion';
// import AccordionSummary from '@material-ui/core/AccordionSummary';
// import AccordionDetails from '@material-ui/core/AccordionDetails';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


function PersonalArea(props) {
  let { setCurrentUser, currentUser, token } = useContext(AuthContext);
  const arr = [2, 4, 5]
  const changeDetilas = async () => {
    const user = {
      id: currentUser.id,
      userId: currentUser.userId,
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      mail: document.getElementById("email").value,
    }

    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    try {
      await axios.put(`http://localhost:9660/users/${currentUser.id}`, user, config);


      // const res=await axios.get(`http://localhost:9660/users/${currentUser.id}`,config)

      //  setCurrentUser(res.data) 

    }
    catch (e) {
      console.log(e)
    }
  }
  const getDetails = async () => {
    try {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
      const res = await axios.get(`http://localhost:9660/users/${currentUser.id}`, config)
      setCurrentUser(res.data)
    }
    catch (err) {
      console.log(err)
    }
  }
  const getPurchaseDtailes=async(x)=>{
      console.log(x)
      let config = {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      }
      const res=await axios.get(`http://localhost:9660/purchase_details/${x.purchaseId}`, config)
      console.log(res.data)
      const object = res.data.find((i)=>i.id == x.purchaseId)
      
      alert('פרטי ההזמנה: '+'\n' +
        'מספר הזמנה: '+ object.id + '\n' +
        'תאריך: '+object.purchase.date+'\n' + 
        'מחיר סופי: '+object.price+'\n'
      )
  }
  // useEffect=()=>{
  //   {getDetails()}
  // }
  return (<>
    <br />
    <h3>פרטים אישיים</h3>
    <TextField id="firstName" defaultValue={currentUser.firstName} label="שם פרטי" type="text" InputLabelProps={{ shrink: true, }} /><br/><br/>
    <TextField id="lastName" defaultValue={currentUser.lastName} label="שם משפחה" type="text" InputLabelProps={{ shrink: true, }} /><br/><br/>
    <TextField id="email" defaultValue={currentUser.email} label="email" type="text" InputLabelProps={{ shrink: true, }} /><br/><br/>
    <TextField id="outlined-number" defaultValue={currentUser.phone} label="Number" type="text" InputLabelProps={{ shrink: true, }} /><br/>
    <Button varient="outline" onClick={changeDetilas}>לעידכון</Button>
   <h3>ספרים</h3>
    <div className="books-grid" role="list" aria-label="רשימת ספרים">
      {currentUser.books.map((x) => <SingleBook book={x} area={true}></SingleBook>)}
    </div>
    <h3>הזמנות</h3>
    {currentUser.purchases.map((x, i) => <div key={i} className="book-wrapper">
      קוד הזמנה: {x.purchaseId}<br />
      <Button key={i} onClick={(e) => { getPurchaseDtailes(x);console.log(e)}}>צפה בפרטים</Button><br />
    </div>
    
    ) }
    <br/>
    <br/>
    <br/>
      </>)
    };
    export default PersonalArea;
