import { Button,Dialog, DialogActions } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';


function AddFriendButton() {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addFriend =()=>{alert("add friend") ;console.log(image)}
      //() => {


       // const res = await axios.post("localhost")
   // }
    
    return (<><Button onClick={handleClickOpen}>הוסף חבר</Button>
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <div style={{ width: 300, textAlign: "center" }}>
                להוסיף חבר
                <br></br>

                <Stack direction="row" alignItems="center" spacing={2}>
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file" onAbort={(e)=>{console.log(e, e.target.value); setImage(e.target.value)}}/>
                        <PhotoCamera />
                    </IconButton>
                </Stack>

                <DialogActions>
                    <Button onClick={() => { addFriend(); handleClose() }} autoFocus>להוספה</Button>
                    <Button onClick={handleClose}>❌</Button>
                </DialogActions>
            </div>
        </Dialog></>)
}
export default AddFriendButton;