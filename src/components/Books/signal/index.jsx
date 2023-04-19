import { Button } from "@mui/material";
import SimpleMap from "./simpaleMap";
function SingleBook({ book, area }) {



    
        return (<>
                {book.name}<br />
                {book.description}<br />
                טלפון:{book.contact_details}<br />
                {console.log(area)}
                {area?<Button>להסרה</Button>:<Button variant="contained" style={{ width: 65, height: 35, fontSize: 12, fontWeight: 150, lineHeight: 1 }} >מצא מיקום</Button>}<br /><br />
                {//<SimpleMap></SimpleMap>
                }
       
        

        </>)

}

export default SingleBook;