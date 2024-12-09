import axios from "axios";
import { useEffect, useState } from "react"
import SingleBook from "./single";
import AddBook from "./AddBook";
import Uploader from "../Uploader";
import "./Books.css"
function Books(props) {
    const [books, setBooks] = useState([])
    const [file, setFile] = useState()

    const getAllBooks = async () => {
        try {
            const res = await axios.get('http://localhost:9660/books');
            //console.log(res.data)
            setBooks(res.data)

        } catch (err) {
            console.log(err)
            //   setErr(err.response.data?.message);
        }

    }



    useEffect(() => {
        getAllBooks()
    }
        , [])

    return <>
        <AddBook setBooks={ setBooks} books={books}></AddBook><br />
        <div className="books-grid" role="list" aria-label="רשימת ספרים">
        {books.map(p => <SingleBook book={p}></SingleBook>)}
</div>
    </>

}

export default Books;