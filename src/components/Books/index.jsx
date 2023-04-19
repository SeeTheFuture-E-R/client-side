import axios from "axios";
import { useEffect, useState } from "react"
import SingleBook from "./signal";
import AddBook from "./AddBook";
import Uploader from "../Uploader";

function Books(props) {
    const [books, setBooks] = useState([])
    const [file, setFile] = useState()

    const getAllBooks = async () => {
        try {
            console.log("all book")
            const res = await axios.get('http://localhost:9660/books');
            console.log(res.data)
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

        {books.map(p => <SingleBook book={p}></SingleBook>)}
    </>

}

export default Books;