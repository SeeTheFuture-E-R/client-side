
import { TextField, Button } from "@mui/material"
import { useState, useContext } from "react"
import axios from "axios";
import { AuthContext } from "../context/authContext";
import CircularIntegration from "../Field/loadingButton";

function MailFriend() {

    const [friendList, setFriendList] = useState([]);
    const [email, setEmail] = useState("");
    const [massage, setMassage] = useState("");

    let { currentUser, token } = useContext(AuthContext);

    const sendMail = async () => {

        console.log(friendList)
        try {
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
            let body = {
                "mailList": friendList,
                "massage": massage,
                "subject": "help your friend"
            }
            const res = await axios.post('http://localhost:9660/mail', body, config);
            console.log(res.data)
            return res.status

        } catch (err) {
            console.log(err)
            //   setErr(err.response.data?.message);
        }
    }

    return (
        <>
            תרצה שנעשה לך את העבודה?<br></br>
            הכנס את המיילים של האנשים שתרצה לקבל מהם תמונות<br></br>
            <TextField onChange={(e) => setEmail(e.target.value)} label={"הכנס כתובת מייל"} variant="outlined" required />
            <Button onClick={() => { setFriendList([...friendList, email]); console.log(friendList, email) }}>הוסף</Button>
            <div>
                <TextField onChange={(e) => setMassage(e.target.value)} label={"מסר שאתה רוצה לכתוב לחברים שלך"} variant="outlined" required />
                <CircularIntegration sendMail={sendMail}></CircularIntegration>
            </div>

        </>
    )
}

export default MailFriend
