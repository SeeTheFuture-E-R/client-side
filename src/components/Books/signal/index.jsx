import { Button } from "@mui/material";

function SingleBook({ book }) {

        return (<>
                {book.name}<br />
                {book.description}<br />
                טלפון:{book.contact_details}<br />
                <Button variant="contained" style={{ width: 65, height: 35, fontSize: 12, fontWeight: 150, lineHeight: 1 }} >מצא מיקום</Button><br /><br />
        </>)

}

export default SingleBook;