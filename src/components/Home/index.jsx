import { Link } from "react-router-dom"
import * as React from 'react';
import BoxLink from './BoxLink'
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import Footer from "./Footer/index"
import Management from "../management";
import "./Home.css"
function Home(props) {

  return <>
    
    <Box class="rtl">
      <Link class= "link" to={'/shopping?category=daily'}>
        <BoxLink url={'../../../image/home_products.jpg'} title='מוצרים'></BoxLink>
      </Link>
      <div class="pageDescription"><br/><br/><br/><br/>אספנו לכם מוצרים ממיטב החברות והמותגים.
חברתינו מסבסדת את המוצרים ברמות סבסוד שונות, בהתאם לזכאות הלקוח.
זאת ע"מ לאפשר לאנשים בעלי מנעד לקויות ראיה חיים נוחים במקסימום האפשרי.
</div>
      </Box>
 
    <Box class="ltr" >
      <Link class= "link" to={"/Icamera"}>
        <BoxLink url={'../../../image/home_camera.jpg'} title='הפיתוח שלנו'></BoxLink>
      </Link>      
      <div class="pageDescription"><br/><br/><br/><br/>הפיתוח החדשני שלנו מהווה עזר לאנשים המתקשים להתנייד בביתם ומסייע להם בזיהוי האנשים שסביבם.
המכשיר מעדכן את המשתמש מי הם הנמצאים באזורי המצלמות בחדרי הבית בכל רגע שיחפץ.
</div>
    
    </Box>
    <Box class="rtl">
      <Link class= "link" to={"/books"}>
        <BoxLink url={'../../../image/home_books.jpg'} title='הספריה'></BoxLink>
      </Link>
      <div class="pageDescription"><br/><br/><br/><br/>הספריה החברתית שלנו מתווכת בין אנשים שבבעלותם ספרי ברייל, לבין אנשים המעונינים בספרים כאלה.
במאגר הספרים שלנו יש מגוון רחב של ספרי קריאה, בישול, הסטוריה ועוד... לכל שלבי החיים.
</div>
    </Box>
    <Box class="ltr">
      <Link class= "link" to={"/articles"}>
        <BoxLink url={'../../../image/home_articles.jpg'} title='מאמרים' ></BoxLink>
      </Link>
      <br/>
      <div class="pageDescription"><br/><br/><br/><br/><br/>מאגר המאמרים שלנו הינו אחד מהמאגרים הגדולים בארץ. 
האוסף שלנו מכיל מאמרים מקצועיים בנושאי בריאות ובפרט בלקויות ראיה.
כאן תוכלו לקבל מידע מלא ומקצועי בכל תחומי החיים הנחוצים לאדם בעל מוגבלות.
</div>
    </Box>
    <Box class="rtl">
      <Link class= "link" to={"/about"}>
        <BoxLink url={'../../../image/home_about.jpg'} title='אודותינו'></BoxLink>
      </Link>
      <div class="pageDescription"><br/><br/><br/><br/>אתרנו החל כפרויקט גמר ללימודי הנדסים בשילוב בינה מלאכותית,
כחלק מהפרויקט פיתחנו את המוצר שלנו לרווחת האיכלוסיה המוגבלת בישראל.
והמשכנו כאתר חברתי המסיע לעיוור להנגשת רוב תחומי חייו.
אנו ממשיכים לעבוד על יעול ושיפור האתר והבאת תוספים נוספים למען עתיד טוב יותר
</div>
    </Box>
    <Footer></Footer>
    <Management></Management>
  </>
}

export default Home;

