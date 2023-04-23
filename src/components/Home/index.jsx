import { Link } from "react-router-dom"
import * as React from 'react';
import BoxLink from './BoxLink'
import { Box } from "@mui/system";

function Home(props) {


  return (<>
    <Link to={'/shopping?category=daily'}>
      <BoxLink url={'../../../image/home_products.jpg'} title='מוצרים'></BoxLink>
    </Link>
    <Link to={"/camera"}>
      <BoxLink url={'../../../image/home_camera.jpg'} title='הפיתוח שלנו'></BoxLink>
    </Link>
    <Link to={"/books"}>
      <BoxLink url={'../../../image/home_books.jpg'} title='הספריה'></BoxLink>
    </Link>
    <Link to={"/articles"}>
      <BoxLink url={'../../../image/home_articles.jpg'} title='מאמרים'></BoxLink>
    </Link>
    <Link to={"/about"}>
      <BoxLink url={'../../../image/home_about.jpg'} title='אודותינו'></BoxLink>
    </Link>

  </>)

}

export default Home;
