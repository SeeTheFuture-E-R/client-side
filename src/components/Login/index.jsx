import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import './Login.css'
function Login(props) {

    const[id,setid]=useState("")
    const[password,setpassword]=useState("")
    const navigate = useNavigate()

    const submit = async()=>{
    // e.preventDefault();
    try {      
      const res = await axios.post('http://localhost:9660/Login',  { userId: id, password:password});
      console.log(res.data)
      console.log(res.data.accessToken)

      localStorage.setItem("token", JSON.stringify(res.data.accessToken));
      
       navigate("/")
    } catch (err) {
        console.log(err)
    //   setErr(err.response.data?.message);
    }


}
   
    return (
        <>
            <div class='container'>
                <div class='window'>
                    <div class='overlay'></div>
                    <div class='content'>
                        <div class='welcome'>להכנס לחשבונך</div>
                        <div class='subtitle'>We're almost done. Before using our services you need to create an account.</div>
                        <div class='input-fields'>
                            <input type='text' placeholder='תעודת זהות' class='input-line full-width' onChange={(e)=>setid(e.target.value)}></input>
                            <input type='password' placeholder='סיסמא' class='input-line full-width' onChange={(e)=>setpassword(e.target.value)}></input>
                        </div>
                        <div class='spacing'>שכחת את הסיסמא?</div>
                        <div><button class='ghost-round full-width' onClick={submit}>Sign In</button></div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Login

