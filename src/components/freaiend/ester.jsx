import axios from "axios"
import{useContext, useEffect} from "react"
import {AuthContext} from '../context/authContext'
function Freind(props){
let { setCurrentUser, setToken, currentUser, token } = useContext(AuthContext);
consr[freind,setFreinds]=useState([])
const getAllFreinds=async()=>{
const res=await axios.get(`http://localhost:3600/freind?userId=${currentUser.id}`,);
console.log(res)
}
useEffect(() => {
    getAllFreinds()
},[])
return(
<>freinds</>
)


}