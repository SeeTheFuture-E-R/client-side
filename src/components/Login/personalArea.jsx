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
    // const useStyles = makeStyles((theme) => ({
    //   root: {
    //     width: '100%',
    //   },
    //   heading: {
    //     fontSize: theme.typography.pxToRem(15),
    //     fontWeight: theme.typography.fontWeightRegular,
    //   },
    // }));
    const user = {
      id: currentUser.id,
      userId: currentUser.userId,
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      //     // phone: currentUser.phone,
      mail: document.getElementById("email").value,
      //     // birth_year: birth_year,
      //     // family_status: family_status,
      //     // num_of_children: num_of_children,
      //     //     blind_card: blind_card,
      //     //     handicap_card: handicap_card,
      //     //     identity_card: identity_card,
      //     //     handicap_precentage: handicap_precentage
    }



    // // e.preventDefault();
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
const res=await axios.get(`http://localhost:9660/users/${x.purchaseId}`, config)
console.log(res)
}
  // useEffect=()=>{
  //   {getDetails()}
  // }
  return (<>
    <br />
    <TextField id="firstName" defaultValue={currentUser.firstName} label="שם פרטי" type="text" InputLabelProps={{ shrink: true, }} /><br/><br/>
    <TextField id="lastName" defaultValue={currentUser.lastName} label="שם משפחה" type="text" InputLabelProps={{ shrink: true, }} /><br/><br/>
    <TextField id="email" defaultValue={currentUser.email} label="email" type="text" InputLabelProps={{ shrink: true, }} /><br/><br/>
    <TextField id="outlined-number" defaultValue={currentUser.phone} label="Number" type="text" InputLabelProps={{ shrink: true, }} /><br/>
    <Button varient="outline" onClick={changeDetilas}>לעידכון</Button>
    <h3>ספרים</h3>
    {currentUser.books.map((x) => <SingleBook book={x} area={true}></SingleBook>)}
    <h3>הזמנות</h3>
    {currentUser.purchases.map((x, i) => <div key={i}>קוד הזמנה: {x.purchaseId}<br /><Button key={i} onClick={(e) => { getPurchaseDtailes(e.target.value);console.log(e)}}>צפה בפרטים</Button><br />
    </div>
    ) }
      </>)
    };
    export default PersonalArea;
