import { Button } from "@mui/material";
import Map from "./simpaleMap";
import axios from "axios";
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import { Dialog } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationDot} from "@fortawesome/free-solid-svg-icons"
//import "../Books.css"
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

        return (
                <div className="book-wrapper" role="article" >
                    <div className="book-content">
                        <div className="book-image-container">
                            <img 
                                className="book-image"
                                src={`http://localhost:9660/images/books/${book.picture}`}
                                alt={book.name}
                                loading="lazy"
                            />
                        </div>
            
                        <h2 className="book-title">{book.name}</h2>
                        <p className="book-description">{book.description}</p>
                        <p className="book-contact">
                            <strong>טלפון: </strong>{book.contact_details}
                        </p>
            
                        {area ? (
                            <button className="action-button" onClick={removeBook}>
                                להסרה
                            </button>
                        ) : (
                            <button 
                                className="action-button location-button"
                                onClick={() => setOpen(true)}
                            >
                                <FontAwesomeIcon icon={faLocationDot} />
                            </button>
                        )}
                    </div>
                </div>
            );

        }

        export default SingleBook;
        // style={{ width: 65, height: 35, fontSize: 12, fontWeight: 150, lineHeight: 1 }}
        //