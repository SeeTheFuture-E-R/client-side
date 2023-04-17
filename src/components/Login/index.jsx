import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Password from "../Field/password";
import{useContext} from "react"
import {AuthContext} from '../context/authContext'
import TextField from '@mui/material/TextField';
import PersonalArea from "./personalArea";
import './Login.css'


function Login(props) {

    const [id, setid] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    let {setCurrentUser,setToken, currentUser, token}=useContext(AuthContext);

    const submit = async () => {
        // e.preventDefault();
        try {
            const res = await axios.post('http://localhost:9660/auth/login', { userId: id, password: password });
            console.log(res.data)
            console.log(res.data.accessToken)

            localStorage.setItem("token", JSON.stringify(res.data.accessToken));
            setCurrentUser(res.data.user)
            console.log(res.data.user)
            setToken(res.data.accessToken)
            navigate("/personalArea")
        } catch (err) {
            console.log(err)
            //   setErr(err.response.data?.message);
        }
    }

    return (
        <>  
            <div>שלום</div>
            <div class='container'>
                <div class='window'>
                    <div class='overlay'></div>
                    <div class='content'>
                        <div class='welcome'>להכנס לחשבונך</div>
                        <div class='subtitle'>We're almost done. Before using our services you need to create an account.</div>
                        <div class='input-fields'>
                            <TextField id="demo-helper-text-misaligned-no-helper" label='*תעודת זהות' onChange={(e) => setid(e.target.value)} />
                            <Password setPassword={setPassword}></Password>
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

