import { EventSeatRounded } from "@mui/icons-material";
import MailFriend from "./MailToFriends";
import { Link } from "react-router-dom"
import Development from './development' 
import Friend from "./friends";
import { useState } from "react";
import ICameraOn from "./ICameraOn";
import axios from 'axios';

function Friends() {
    const [development, setDevelopment]=useState(false)
    
  const startTrial = async () => {
    const res = await axios.post('http://localhost:8000/02');
    console.log(res.data);
  };

    function start(){
        startTrial()
        setDevelopment(true)
        window.open(window.location.href, '_blank');
    }
    return (
        <>
            {!development?
            <><MailFriend></MailFriend>
            <Friend></Friend>
            <button onClick={start}>להתחיל בנסיון</button></>
            :
            <Development></Development>
            }
            {/* <ICameraOn></ICameraOn> */}
        </>
    )
}

export default Friends