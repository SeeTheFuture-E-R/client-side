import { Link } from "react-router-dom"
import * as React from 'react';
import BoxLink from './BoxLink'

function Home(props) {
  

     return (<>
    <Link to={'/shopping?category=daily'}>
      <BoxLink url={'../../../image/home_products.png'}></BoxLink>
    </Link> 
     <Link to={"/camera"}>הפיתוח שלנו</Link>
     <Link to={"/books"}>הספריה</Link>
     <Link to={"/articles"}>מאמרים</Link>
     <Link to={"/about"}>אודותינו</Link>
    
     </>)

}

export default Home;
