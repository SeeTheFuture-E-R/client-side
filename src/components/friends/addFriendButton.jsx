import { Button, Dialog, DialogActions } from '@mui/material';
import axios from 'axios';
import { useState, useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { AuthContext } from '../context/authContext';
import Uploader from '../Uploader';

function AddFriendButton({ friends, setFriends }) {

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("")
    const [image, setImage] = useState('');
    let { currentUser, token } = useContext(AuthContext);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addFriend = async () => { //alert("add friend"); console.log(image) }
        const friend = { userId: currentUser.id, name, picturePath: image.name }
        try {
            const res = await axios.post(`http://localhost:9660/friends`, friend, { headers: { 'Authorization': 'Bearer ' + token } })
            const imgRes = await axios.post(`http://localhost:9660/friends/${res.data.friendId}`, image,  { headers: { 'Authorization': 'Bearer ' + token, "Content-Type": "multipart/form-data" }})
            setFriends([...friends, res.data])
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <Button onClick={handleClickOpen}>הוסף חבר</Button>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div style={{ width: 300, textAlign: "center" }}>
                    הכנס שם של החבר
                    { //   <input type="text" id="name" name="name" required minlength="4" maxlength="8" size="10"/>
                    }
                    <br />
                    <input type="text" onChange={(e) => { setName(e.target.value) }} placeholder="vghbb" />


                    <br />

                    <Uploader file={image} setFile={setImage}></Uploader>
                    <DialogActions>
                        <Button onClick={() => { addFriend(); handleClose() }} autoFocus>להוספה</Button>
                        <Button onClick={handleClose}>❌</Button>
                    </DialogActions>
                </div>
            </Dialog>
            <img></img>
        </>
    )
}

export default AddFriendButton;
//name=e.target.value; 