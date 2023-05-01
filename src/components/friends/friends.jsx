import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from '../context/authContext';
import SingleFriend from './singleFriend';
import AddFriendButton from './addFriendButton'

function Friend(props) {
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
            {friends.map((f, i) => <SingleFriend key={i} friend={f} friends={friends} setFriends={setFriends}></SingleFriend>)}
            <AddFriendButton friends={friends} setFriends={setFriends} ></AddFriendButton>
        </>
    )


}
export default Friend;