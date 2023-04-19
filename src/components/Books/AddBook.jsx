
import axios from "axios";
import { useState, useContext } from "react";
import { Button, Dialog, DialogActions, Box, TextField } from '@mui/material';
import {AuthContext} from "../context/authContext"

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


function AddBook({books, setBooks}) {


    const [open, setOpen] = useState(false);
    let { currentUser, token } = useContext(AuthContext);

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
                userId:currentUser?.id,
                contact_details:  document.getElementById("טלפון / מייל").value, 
                address:  document.getElementById("כתובת").value
            };
            console.log(Book)

            let config = {
                headers: {
                  'Authorization': 'Bearer ' + token
                }
            }
            const res = await axios.post('http://localhost:9660/books', Book,config);
            console.log(res.data)
            setBooks([...books,res.data])

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
                    <div style={{ width: 300, textAlign: "center"}}>
                        פרטי הספר
                        <br></br>
                        {details.map((l, i) => <><TextField id={l} label={l} key={i} variant="outlined" /><br></br></>)}
                        {requireDetails.map((l, i) => <><TextField id={l} label={l} key={i} variant="outlined" required /><br></br></>)}
                  
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