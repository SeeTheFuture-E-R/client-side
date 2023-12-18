import { EventSeatRounded } from "@mui/icons-material";
import MailFriend from "./MailToFriends";
import { Link } from "react-router-dom"
import Development from './development' 
import Friend from "./friends";
<<<<<<< HEAD
import { useState } from "react";
=======
import ICameraOn from "./ICameraOn";
>>>>>>> 99159f384ec2c0b44ef145677652a06077d52d11

function Friends() {
    const [development, setDevelopment]=useState(false)
    return (
        <>
            {!development?<><MailFriend></MailFriend>
            <Friend></Friend>
<<<<<<< HEAD
            <button onClick={()=>{setDevelopment(true)}}>להתחיל בנסיון</button></>:
            <Development></Development>
            }
=======
            <ICameraOn></ICameraOn>
>>>>>>> 99159f384ec2c0b44ef145677652a06077d52d11
        </>
    )
}

export default Friends