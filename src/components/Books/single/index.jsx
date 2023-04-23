import { Button } from "@mui/material";
import SimpleMap from "./simpaleMap";
import axios from "axios";
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
function SingleBook({ book, area }) {
        let { setCurrentUser, currentUser, token } = useContext(AuthContext);
        const removeBook = async () => {
                console.log(book)

                let config = {
                        headers: {
                                'Authorization': 'Bearer ' + token
                        }
                }
                try {

                        const res = await axios.delete(`http://localhost:9660/books/${book.bookId}`, config);
                        console.log(res)
                        const newUser = await axios.get(`http://localhost:9660/users/${currentUser.id}`, config)

                        setCurrentUser(newUser.data)

                }
                catch (e) {
                        console.log(e)
                }

        }



        return (<>
                { }
                {book.name}<br />
                {book.description}<br />
                טלפון:{book.contact_details}<br />
                {console.log(area)}
                {area ? <Button onClick={removeBook}>להסרה</Button> : <Button variant="contained" style={{ width: 65, height: 35, fontSize: 12, fontWeight: 150, lineHeight: 1 }} >מצא מיקום</Button>}<br /><br />
                {//<SimpleMap></SimpleMap>
                }



        </>)

}

export default SingleBook;