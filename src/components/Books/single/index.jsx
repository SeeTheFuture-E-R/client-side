import { Button } from "@mui/material";
import Map from "./simpaleMap";
import axios from "axios";
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import { Dialog } from "@mui/material";
import { Box } from "@mui/system";
import Marker from "react-google-maps/lib/components/Marker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faInbox,  faMailBulk, faPhone,faSearch ,faLocationDot} from "@fortawesome/free-solid-svg-icons"
// import { FaMapMarkerAlt } from "react-icons/Fa";
<i class="fa-solid fa-map-location-dot"></i>
import "../Books.css"
function SingleBook({ book, area }) {
        let { setCurrentUser, currentUser, token } = useContext(AuthContext);
        const [open, setOpen] = useState(false)
        const removeBook = async () => {
                // console.log(book)

                let config = {
                        headers: {
                                'Authorization': 'Bearer ' + token
                        }
                }
                try {

                        const res = await axios.delete(`http://localhost:9660/books/${book.bookId}`, config);
                        //console.log(res)
                        const newUser = await axios.get(`http://localhost:9660/users/${currentUser.id}`, config)

                        setCurrentUser(newUser.data)

                }
                catch (e) {
                        console.log(e)
                }

        }



        return (<div class="single">
                {/* <button ><FaMapMarkerAlt ></FaMapMarkerAlt></button> */}
                <img src={`http://localhost:9660/images/books/${book.picture}`}></img>
                <br/>
                {book.name}<br />
                {book.description}<br />
                טלפון:{book.contact_details}<br />     
                  

                {area ? <Button onClick={removeBook}>להסרה</Button> :
                <FontAwesomeIcon  onClick={() => setOpen(true)} icon={faLocationDot}fontSize={"30px"}/>}
                        {/* // <button onClick={() => setOpen(true)}  style={{borderRadius: "180px"}} ><FontAwesomeIcon icon={faLocationDot}fontSize={"30px"}/>  </button>} */}
                        <br /><br />
                <Dialog
                        open={open}
                        fullWidth={true}
                        maxWidth={"1000px"}
                        scroll="body"
                >
                        <div style={{ height: 750 }} >
                                <Map address={book.address} marker={{position: book.address}}>
                                        <Marker position={book.address} title="the book is here" />
                                </Map>
                                <Button onClick={() => setOpen(false)}>❌</Button></div>
                </Dialog>




        </div>)

}

export default SingleBook;
// style={{ width: 65, height: 35, fontSize: 12, fontWeight: 150, lineHeight: 1 }}