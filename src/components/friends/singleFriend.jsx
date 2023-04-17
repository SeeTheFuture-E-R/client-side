
import { useState, useContext } from "react"
import axios from "axios"; 
import { Button} from '@mui/material';
import {AuthContext} from '../context/authContext';
import { Card } from '@mui/material';

function SingleFriend({friend}){
    let { token } = useContext(AuthContext);
    const deleteFriend=async()=> {
        try{
        const res=await axios.delete(`http://localhost:9660/friends/${friend.friendId}`,{headers: { 'Authorization': 'Bearer ' + token}})
        console.log("delete"+friend.friendId)
    }
    catch(err){
console.log(err)
    }
}

return (
   <> 
   <Card>
    {friend.name}
    <br/>תמונה
    <Button onClick={deleteFriend}>הסר חבר</Button>
   </Card>
    </>
)
}

export default SingleFriend;