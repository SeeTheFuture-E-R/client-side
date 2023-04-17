import { useEffect } from "react"
import { Button } from "@mui/material"
import TextField from '@mui/material/TextField';
import{useContext} from "react"
import {AuthContext} from '../context/authContext'
import axios from "axios";
function  PersonalArea(props){
let { setCurrentUser, setToken, currentUser, token } = useContext(AuthContext);
  const changeDetilas=async()=>{
    console.log("ffffffffffffffff")
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

 console.log("test", user)

// // e.preventDefault();
let config = {
  headers: {
    'Authorization': 'Bearer ' + token
  }
}
try{
     await axios.put(`http://localhost:9660/users/${currentUser.id}`, user,config);
     //console.log("faleeeeeeeeeeeeeeeee")
       setCurrentUser(user)
    }
catch(e){
console.log(e+"faleeeeeeeeeeeeeeeee")
}
   }
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
        label="Number"
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
      /><TextField
      id="outlined-number"
      defaultValue="Default Value"
      label="Number"
      type="text"
      InputLabelProps={{
        shrink: true,
      }}
    />
       
    <Button varient="outline" onClick={changeDetilas}>לעידכון</Button>
    </>)
}
export default PersonalArea;
