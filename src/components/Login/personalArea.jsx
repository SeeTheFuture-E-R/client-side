import { useEffect } from "react"
import { Button } from "@mui/material"
import TextField from '@mui/material/TextField';
import{useContext} from "react"
import {AuthContext} from '../context/authContext'
import axios from "axios";
import SingleBook from "../Books/single";
import { Start } from "@mui/icons-material";
function  PersonalArea(props){
let { setCurrentUser, currentUser, token } = useContext(AuthContext);
const arr=[2,4,5]
  const changeDetilas=async()=>{

  const user = {
    id:currentUser.id,
    userId: currentUser.userId,
     firstName:  document.getElementById("firstName").value,
          lastName:  document.getElementById("lastName").value,
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
try{
     await axios.put(`http://localhost:9660/users/${currentUser.id}`, user,config);
     

      const res=await axios.get(`http://localhost:9660/users/${currentUser.id}`,config)
     
       setCurrentUser(res.data) 
       
    }
catch(e){
console.log(e)
}
}
const getDetails=async()=>{
  try{
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
  const res=await axios.get(`http://localhost:9660/users/${currentUser.id}`,config)
  }
  catch(err){
    
    console.log(err)
  }
}
   
    // useEffect=()=>{
    //   {getDetails()}
    // }
    return (<>
    <br/>
         <TextField
          id="firstName"
          defaultValue={currentUser.firstName}
          label="שם פרטי"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="lastName"
          defaultValue={currentUser.lastName}
          label="שם משפחה"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
        /><TextField
        id="email"
        defaultValue={currentUser.email}
        label="email"
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
      /><TextField
      id="outlined-number"
      defaultValue={currentUser.phon}
      label="Number"
      type="text"
      InputLabelProps={{
        shrink: true,
      }}
    />
    <Button varient="outline" onClick={changeDetilas}>לעידכון</Button> 
    {/* <SingleBook book={{
        bookId: 7,
        name:"",
        picture: null,
        description:" ספר ראשון בסידרת ממלכה במבחן",
        author:" מיה קינן",
        num_of_pages: 450,       
        contact_details: "0583236977"
        
    }} area={true}>jjjjjj</SingleBook> */}
    { currentUser.books.map((x) => <SingleBook book={x} area={true}></SingleBook>)}
    {/* books.map(p => <SingleBook book={p}></SingleBook>) */}
    
    </>)
}
export default PersonalArea;
/*  */
    /* <SingleBook book={x} area={true}>jjjjjj</SingleBook> */