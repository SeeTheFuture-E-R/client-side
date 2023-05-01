import { Link } from "react-router-dom"
import * as React from 'react';
import BoxLink from './BoxLink'
import { Box } from "@mui/system";
import { Grid } from "@mui/material";

function Home(props) {


  return <>
    <Grid >
      <Link to={'/shopping?category=daily'}>
        <BoxLink url={'../../../image/home_products.jpg'} title='מוצרים'></BoxLink>
      </Link>
      <span>products</span>
    </Grid>
    <Box dir="ltr">
      <Link to={"/Icamera"}>
        <BoxLink url={'../../../image/home_camera.jpg'} title='הפיתוח שלנו'></BoxLink>
      </Link>
      <p>ICamera</p>
    </Box>
    <Box>
      <Link to={"/books"}>
        <BoxLink url={'../../../image/home_books.jpg'} title='הספריה'></BoxLink>
      </Link>
      <p>books</p>
    </Box>
    <Box dir="ltr">
      <Link to={"/articles"}>
        <BoxLink url={'../../../image/home_articles.jpg'} title='מאמרים' ></BoxLink>
      </Link>
      <p>articles</p>
    </Box>
    <Box>
      <Link to={"/about"}>
        <BoxLink url={'../../../image/home_about.jpg'} title='אודותינו'></BoxLink>
      </Link>
      <p>products</p>
    </Box>
    <div>bbbbbbbbbbbb</div>// style="border: solid black 5px;"
  </>

}

export default Home;
