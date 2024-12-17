import axios from "axios";
import { useEffect, useState } from "react"
import SingleBook from "./single";
import AddBook from "./AddBook";
import Uploader from "../Uploader";
import "./Books.css"
function Books(props) {
    const [books, setBooks] = useState([])
    const [filteredBooks, setFilteredBooks] = useState([])
    const [file, setFile] = useState()

    const getAllBooks = async () => {
        try {
            const res = await axios.get('http://localhost:9660/books');
            //console.log(res.data)
            setBooks(res.data)
            setFilteredBooks(res.data)

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
        <QuickSearchFilter filteredBooks={filteredBooks} setFilteredBooks={setFilteredBooks} setBooks={setBooks} books={books}></QuickSearchFilter>
        <div className="books-grid" role="list" aria-label="רשימת ספרים">
        {filteredBooks.map(p => <SingleBook book={p}></SingleBook>)}
</div>
    </>

}

export default Books;

const QuickSearchFilter = ({filteredBooks, setFilteredBooks, setBooks, books}) => {
    
    const handleChange = (e) => {
        const value = e.target.value
        console.log(value)
        if(value.length== 0 || value== null){
            setFilteredBooks(books)
            return
        }
        console.log(books)
        const filteredBooks = books.filter(book =>
         book.author?.toLowerCase().includes(value.toLowerCase())
        || book.name?.toLowerCase().includes(value.toLowerCase())
        || book.description?.toLowerCase().includes(value.toLowerCase())
        || book.year?.toLowerCase().includes(value.toLowerCase())
        || book.price?.toLowerCase().includes(value.toLowerCase()));

        setFilteredBooks(filteredBooks)
    }

    return   <div className="search-container">
    <input 
        type="text" 
        className="search-input"
        placeholder="חיפוש..." 
        onChange={handleChange} 
    />
</div>;
}