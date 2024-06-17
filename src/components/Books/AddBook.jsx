
import axios from "axios";
import { useState, useContext } from "react";
import { Button, Dialog, DialogActions, Box, TextField } from '@mui/material';
import { AuthContext } from "../context/authContext"
import Uploader from '../Uploader'
//   return (
//     <Box
//       component="form"
//       sx={{
//         '& > :not(style)': { m: 1, width: '25ch' },
//       }}
//       noValidate
//       autoComplete="off"
//     >
//       <TextField id="outlined-basic" label="Outlined" variant="outlined" />
//       <TextField id="filled-basic" label="Filled" variant="filled" />
//       <TextField id="standard-basic" label="Standard" variant="standard" />
//     </Box>
//   );
// }


function AddBook({ books, setBooks }) {

    const [open, setOpen] = useState(false);
    let { setCurrentUser, currentUser, token } = useContext(AuthContext);
    const [image, setImage] = useState()

    const requireDetails = ["טלפון / מייל", "כתובת"]
    const details = ["שם הספר", "סופר", "תיאור", "מספר עמודים"]

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addBook = async () => {
        try {
            const Book = {
                name: document.getElementById("שם הספר").value,
                picture: "picture",
                description: document.getElementById("תיאור").value,
                author: document.getElementById("סופר").value,
                num_of_pages: parseInt(document.getElementById("מספר עמודים").value),
                userId: currentUser?.id,
                contact_details: document.getElementById("טלפון / מייל").value,
                address: document.getElementById("כתובת").value,
            };


            let config = {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
            const res = await axios.post('http://localhost:9660/books', Book, config);
            const picture=await axios.post(`http://localhost:9660/books/${res.data.bookId}`, image, { headers: { 'Authorization': 'Bearer ' + token, "Content-Type": "multipart/form-data" } })
            let newUser = currentUser
            res.data.picture = picture.data.name
            newUser.books = [...currentUser.books, res.data]
            console.log(newUser.books)
            setCurrentUser(newUser);
            setBooks([...books, res.data])
        }
        catch (err) {
            console.log(err)
            //   setErr(err.response.data?.message);
        }
    }
    return (
        <>
            <div>
                <Button variant="outlined" onClick={handleClickOpen}>הוספת ספר</Button>
                <Dialog
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <div style={{ width: 300, textAlign: "center" }}>
                        פרטי הספר
                        <br></br>
                        {details.map((l, i) => <><TextField id={l} label={l} key={i} variant="outlined" /><br></br></>)}
                        {requireDetails.map((l, i) => <><TextField id={l} label={l} key={i} variant="outlined" required /><br></br></>)}
                        <Uploader file={image} setFile={setImage}></Uploader>
                        <DialogActions>
                            <Button onClick={() => { addBook(); handleClose() }} autoFocus>להוספה</Button>
                            <Button onClick={handleClose}>❌</Button>
                        </DialogActions>
                    </div>
                </Dialog>
            </div>
        </>)
}

export default AddBook;