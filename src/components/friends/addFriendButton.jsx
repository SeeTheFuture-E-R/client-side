import { Button, Dialog, DialogActions } from '@mui/material';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';

import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { AuthContext } from '../context/authContext';
import Uploader from '../Uploader';
import Webcam from "react-webcam";
import Camera from './camera';
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {fasolid, faCirclePlus ,faLocationDot} from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

function AddFriendButton({ friends, setFriends }) {

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("")
    const [image, setImage] = useState('');
    const [cameraOpen, setCameraOpen] = useState(false)
    const navigate = useNavigate()
    const takePicture = async ()=>{
        const res = await axios.post(`http://localhost:8000/01`)
        console.log(res)
        setCameraOpen(true)
    }

    let { currentUser, token } = useContext(AuthContext);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addFriend = async () => { //alert("add friend"); console.log(image) }
        console.log(image)
        console.log("🧑🏿‍🎄🧓🏽👩🏽‍🦰😉😕🍹😣")
        if(!currentUser.id)
            navigate("/login")
        const friend = { userId: currentUser.id, name }//, picturePath: image.name }
        try {
            const res = await axios.post(`http://localhost:9660/friends`, friend, { headers: { 'Authorization': 'Bearer ' + token } })
            console.log(res)
            const picture = await axios.post(`http://localhost:9660/friends/${res.data.friendId}`, image, { headers: { 'Authorization': 'Bearer ' + token, "Content-Type": "multipart/form-data" } })
            res.data.picturePath = picture.data.name
            setFriends([...friends, res.data])
        }
        catch (err) {
            console.log(err.masseage)
        }
    }


    return (
        <>

            <FontAwesomeIcon 
            onClick={handleClickOpen} 
            icon={faCirclePlus} 
            fontSize={"30px"}  
            style={{color: "#28e41b", fontSize: "90px"}}
            
            ></FontAwesomeIcon>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div style={{ width: 300, textAlign: "center" }}>
                    הכנס שם של החבר
                    <br />
                    <input style={{ border: "1px solid" }} type="text" onChange={(e) => { setName(e.target.value) }} placeholder="vghbb" />
                    <br />
                    <Uploader file={image} setFile={setImage}></Uploader>
                    <DialogActions>
                        <Button onClick={() => { addFriend(); handleClose() }} autoFocus>להוספה</Button>
                        <Button onClick={handleClose}>❌</Button>
                    </DialogActions>
                </div>
            </Dialog>
        </>
    )
}

export default AddFriendButton;
