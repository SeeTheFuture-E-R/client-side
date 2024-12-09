import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Password from "../Field/password";
import { useContext } from "react"
import { AuthContext } from '../context/authContext'
import TextField from '@mui/material/TextField';
import PersonalArea from "./personalArea";
import './Login.css'


function Login(props) {

    const [id, setid] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    let { setCurrentUser, setToken, currentUser, token } = useContext(AuthContext);

    const submit = async () => {
        // e.preventDefault();
        try {
            const res = await axios.post('http://localhost:9660/auth/login', { userId: id, password: password });
            setCurrentUser(res.data.user)
            setToken(res.data.accessToken)     
            navigate("/personalArea")

        } catch (err) {
            console.log(err.response.status)
            if (err.response.status == 401)
                {
                document.getElementById("comments").innerText="*הסיסמה אינה נכונה";
           // document.getElementsByClassName("comments").style.visibility="visible";
        }
            if (err.response.status == 500)
                {document.getElementById("comments").innerText="*אינך רשום במערכת, שנה ת.ז. או ירשם";}
      
        }
    }

    return (
                <div class='container'>
                    <div class='welcome'>שלום</div>
                        <div class='welcome'>להיכנס לחשבונך</div>
                            <div class='input-fields'>
                                <TextField label='*תעודת זהות' onChange={(e) => setid(e.target.value)} />
                                <Password class='password' setPassword={setPassword} ></Password>
                                <br/>
                            </div>
                            <div class='spacing'>שכחת את הסיסמא?</div>
                            <div>
                                <button class='ghost-round' onClick={submit}>Sign In</button>
                            </div>
                </div>
            );
}
            export default Login

