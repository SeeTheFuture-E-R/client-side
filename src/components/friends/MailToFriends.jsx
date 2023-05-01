
import { DialogContentText, DialogContent, DialogActions, DialogTitle, ListItemText, TextField, Button, Dialog, List, Avatar, ListItem, ListItemAvatar, ListItemButton } from "@mui/material"
import { useState, useContext } from "react"
import axios from "axios";
import { AuthContext } from "../context/authContext";
import CircularIntegration from "../Field/loadingButton";
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';

function MailFriend(props) {

    const [friendList, setFriendList] = useState([]);
    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addFriend = () => {
        closeAddEmail()
        setFriendList([...friendList, email])
    }

    const [openAddEmail, setOpenAddEmail] = useState(false);

    const openAddEmailFriend = () => {
        setOpen(false)
        setOpenAddEmail(true);
    };

    const closeAddEmail = () => {
        setOpen(true)
        setOpenAddEmail(false);
    };

    let { currentUser, token } = useContext(AuthContext);

    const sendMail = async () => {

        console.log(friendList)
        try {
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
            let body = {
                "mailList": friendList,
                "massage": `הי,
            החבר שלך${currentUser.firstName} ${currentUser.lastName} מבקש שתעזור לו!
            הכנס לקישור והכנס תמונה ושם,
            תודה!`,
                "subject": "See the Future :: help your friend"
            }
            const res = await axios.post('http://localhost:9660/mail', body, config);
            console.log(res.data)
            return res.status

        } catch (err) {
            console.log(err)
            //   setErr(err.response.data?.message);
        }
    }

    return (
        <>
            תרצה שנעשה לך את העבודה?<br></br>
            הכנס את המיילים של האנשים שתרצה לקבל מהם תמונות<br></br>

            <Dialog onClose={handleClose} open={open}>
                <DialogTitle onClick={handleClickOpen}>רשימת החברים</DialogTitle>
                <List sx={{ pt: 0 }}>
                    {friendList.map((email) => (
                        <ListItem disableGutters>
                            <ListItemButton key={email}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={email} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    <ListItem disableGutters>
                        <ListItemButton
                            autoFocus
                            onClick={openAddEmailFriend}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    <AddIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="Add account" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Dialog>

            <Dialog open={openAddEmail} onClose={closeAddEmail}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAddEmail}>Cancel</Button>
                    <Button onClick={addFriend}>Add</Button>
                </DialogActions>
            </Dialog>


            <Button onClick={handleClickOpen}>רשימת החברים</Button>
            <CircularIntegration sendMail={sendMail}></CircularIntegration>

        </>
    )
}

export default MailFriend
