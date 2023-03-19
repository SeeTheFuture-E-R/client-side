import React, {  useState } from "react";
import './Register.css'
import {  useNavigate } from "react-router-dom";
import axios from "axios";

function Register(props) {
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userId, setUserId] = useState("")
    // const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    // const [birth_year, setBirth_year] = useState(null)
    // const [family_status, setFamily_status] = useState("")
    const [num_of_children, setNum_of_children] = useState(0)
    const [password, setPassword] = useState("")
    // const [blind_card, setBlind_card] = useState("")
    // const [handicap_card, setHandicap_card] = useState("")
    // const [identity_card, setIdentity_card] = useState("")
    // const [handicap_precentage, setHandicap_precentage] = useState(0)

    const sumbit = async () => {
        const user = {
            userId: userId,
            password: password,
            firstName: firstName,
            lastName: lastName,
            // phone: phone,
           email: email,
            // birth_year: birth_year,
            // family_status: family_status,
            // num_of_children: num_of_children,
        //     blind_card: blind_card,
        //     handicap_card: handicap_card,
        //     identity_card: identity_card,
        //     handicap_precentage: handicap_precentage
    }
console.log("test", user)
        // setErr("")
        // e.preventDefault();
    
        try {
          await axios.post('http://localhost:9660/auth/register', user);
          navigate("/login")
        } catch (err) {
            alert(err)
        //   setErr(err.response.data?.message);
        }
      
    //     try {
    //         const token = await fetch('http://localhost:9660/Login', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-type': 'application/json'
    //             },
    //             body: JSON.stringify(user)
    //         })
    //         console.log(token);
    //     }
    //     catch (e) {
    //         console.log(e)
    //     }
    // }
    }

    return (
        <>
            <div class='container'>
                <div class='window'>
                    <div class='overlay'></div>
                    <div class='content'>
                        <div class='welcome'> להרשם לאתר</div>
                        <div class='subtitle'>We're almost done. Before using our services you need to create an account.</div>
                        <div class='input-fields'>
                            <input type='text' placeholder='תעודת זהות' class='input-line full-width' onChange={(e)=>setUserId(e.target.value)}></input>
                            <input type='text' placeholder='שם פרטי' class='input-line full-width' onChange={(e)=>setFirstName(e.target.value)}></input>
                            <input type='text' placeholder='שם משפחה' class='input-line full-width' onChange={(e)=>setLastName(e.target.value)}></input>
                            {/* <input type='text' placeholder='פלאפון' class='input-line full-width' onChange={(e)=>setPhone(e)}></input> */}
                            <input type='email' placeholder='איימיל' class='input-line full-width' onChange={(e)=>setEmail(e.target.value)}></input>
                            {/* <input type='number' placeholder='שנת לידה' class='input-line full-width' onChange={(e)=>setBirth_year(e)}></input> */}
                            {/* status??? */}
                            <input type='number' placeholder='מספר ילדים ' class='input-line full-width' onChange={(e)=>setNum_of_children(e.target.value)}></input>
                            <input type='password' placeholder='סיסמה' class='input-line full-width' onChange={(e)=>setPassword(e.target.value)}></input>
                        </div>
                        <div><button class='ghost-round full-width' onClick={()=>{sumbit()}}>Sign Up</button></div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Register





