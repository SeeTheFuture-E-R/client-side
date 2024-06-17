import { Button } from "@mui/material";
import Map from "./simpaleMap";
import axios from "axios";
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import { Dialog } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot} from "@fortawesome/free-solid-svg-icons"
import "../Books.css"
import { faXmark } from "@fortawesome/free-solid-svg-icons";
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
                <img alt="image of book" title="image of book" src={`http://localhost:9660/images/books/${book.picture}`}></img>
                <br/>
                {book.name}<br />
                {book.description}<br />
                טלפון:{book.contact_details}<br />     
                {area ? <Button onClick={removeBook}>להסרה</Button> :
                <FontAwesomeIcon class="map" onClick={() => setOpen(true)} icon={faLocationDot}fontSize={"30px"}/>}
                        {/* // <button onClick={() => setOpen(true)}  style={{borderRadius: "180px"}} ><FontAwesomeIcon icon={faLocationDot}fontSize={"30px"}/>  </button>} */}
                        <br /><br />
                <Dialog
                        open={open}
                        fullWidth={false}
                        maxWidth={"1000px"}
                        scroll="body"
                >
                        <div style={{ height: 600, width:500 }} >
                                <Map address={book.address} ></Map>
                                <Button  onClick={() => setOpen(false)} >
                                        <FontAwesomeIcon onClick={() => setOpen(true)} icon={faXmark} fontSize={"30px"} style={{color:"#dd131d"}}/>
                                </Button></div>
                </Dialog>




        </div>)

        }

        export default SingleBook;
        // style={{ width: 65, height: 35, fontSize: 12, fontWeight: 150, lineHeight: 1 }}
        //