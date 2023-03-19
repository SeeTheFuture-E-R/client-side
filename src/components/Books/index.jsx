import axios from "axios";
import {useEffect,useState} from "react"
import SingleBook from "./signal";

function Books(props)
{
    const [books,setBooks]=useState([])

    const getAllBooks=async()=>{
        try {
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
    <button>להוספת ספר</button><br/>
       {books.map(p=><SingleBook book={p}></SingleBook>)}
        </>
       
}

export default Books;