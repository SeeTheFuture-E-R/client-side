import { EventSeatRounded } from "@mui/icons-material";
import MailFriend from "./MailToFriends";
import { Link } from "react-router-dom"
import Development from './development' 
import Friend from "./friends";
import { useState } from "react";

function Friends() {
    const [development, setDevelopment]=useState(false)
    return (
        <>
            {!development?<><MailFriend></MailFriend>
            <Friend></Friend>
            <button onClick={()=>{setDevelopment(true)}}>להתחיל בנסיון</button></>:
            <Development></Development>
            }
        </>
    )
}

export default Friends