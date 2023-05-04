import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from '../context/authContext';
import SingleFriend from './singleFriend';
import AddFriendButton from './addFriendButton'
import { Grid } from "@mui/material";




function Friend() {
    let { currentUser, token } = useContext(AuthContext);
    const [friends, setFriends] = useState([])

    const getAllFriends = async () => {
        try {
            const res = await axios.get(`http://localhost:9660/friends?userId=${currentUser.id}`, { headers: { 'Authorization': 'Bearer ' + token } });
            setFriends(res.data)
        }
        catch (err) {
            console.log("oooooooooffff" + err)
        }
    }
    useEffect(() => {
        getAllFriends()
    }, [])

    return (
        <><br />
            <AddFriendButton friends={friends} setFriends={setFriends} ></AddFriendButton>
            <Grid container justifyContent="center" spacing={14}>
                {friends.map((f, i) =>
                    <Grid key={i} item> <SingleFriend key={i} friend={f} friends={friends} setFriends={setFriends}></SingleFriend></Grid>
                )}


            </Grid>
        </>
    )


}
export default Friend;
