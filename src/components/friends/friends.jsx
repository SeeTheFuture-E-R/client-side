import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from '../context/authContext';
import SingleFriend from './singleFriend';
import AddFriendButton from './addFriendButton'
function Friend(props) {
    let { currentUser, token } = useContext(AuthContext);
    const [friends, setFriends] = useState([])
    const getAllFreinds = async () => {
        try {
            const res = await axios.get(`http://localhost:9660/friends?userId=${currentUser.id}`, { headers: { 'Authorization': 'Bearer ' + token } });
            console.log(res.data)
            setFriends(res.data)
        }
        catch (err) {
            console.log("oooooooooffff" + err)
        }
    }
    useEffect(() => {
        getAllFreinds()
    }, [])

    return (
        <><br />
            freinds

            {friends.map(f => <SingleFriend friend={f} friends={friends} setFriends={setFriends}></SingleFriend>)}
            <AddFriendButton friends={friends} setFriends={setFriends} ></AddFriendButton>
        </>
    )


}
export default Friend;