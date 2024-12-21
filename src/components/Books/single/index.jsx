import { Button, Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // אייקון סגירה של MUI
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Map from "./simpaleMap";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import "../Books.css";

function SingleBook({ book, area }) {
    let { setCurrentUser, currentUser, token } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    const removeBook = async () => {
        let config = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };
        try {
            await axios.delete(`http://localhost:9660/books/${book.bookId}`, config);
            const newUser = await axios.get(`http://localhost:9660/users/${currentUser.id}`, config);
            setCurrentUser(newUser.data);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="book-wrapper" role="article">
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
                    <strong>טלפון: </strong>
                    {book.contact_details}
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

            {/* Map Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
                <div className="map-dialog-header" style={{ display: "flex", justifyContent: "flex-end" }}>
                    {/* Close Button */}
                    <IconButton onClick={() => setOpen(false)} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </div>
                <div className="map-container">
                    <Map address={book.address || "שרי ישראל 57 ירושלים"} />
                </div>
            </Dialog>
        </div>
    );
}

export default SingleBook;
