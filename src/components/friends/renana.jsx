
import { TextField, Button } from "@mui/material"
import { useState, useContext } from "react"
import axios from "axios";
import { AuthContext } from "../context/authContext";

function MailFreind() {
    const [freindList, setFreindList] = useState([]);
    const [email, setEmail] = useState("");
    const [massage, setMassage] = useState("");
    
    let { currentUser, token } = useContext(AuthContext);

    const sendMail = async () => {

        console.log(freindList)
        try {
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
            let body = {
                "mailList" : freindList,
                "massage" : massage,
                "subject" : "help your freind"
            }
            const res = await axios.post('http://localhost:9660/mail', body, config);
            console.log(res.data)

        } catch (err) {
            console.log(err)
            //   setErr(err.response.data?.message);
        }
    }

    return (
        <>
            תרצה שנעשה לך את העבודה?<br></br>
            הכנס את המיילים של האנשים שרצה לקבל מהם תמונות<br></br>
            <TextField onChange={(e) => setEmail(e.target.value)} label={"הכנס כתובת מייל"} variant="outlined" required />
            <Button onClick={() => { setFreindList([...freindList, email]); console.log(freindList, email) }}>הוסף</Button>
            <TextField onChange={(e) => setMassage(e.target.value)} label={"מסר שאתה רוצה לכתוב לחברים שלך"} variant="outlined" required />
            <Button onClick={sendMail}>שלח מייל</Button>
        </>
    )
}

export default MailFreind
