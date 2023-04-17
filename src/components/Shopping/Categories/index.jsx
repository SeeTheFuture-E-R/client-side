
import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
function Categories() {
   
    const navigate = useNavigate()

    function changeCategory(c)
    {
      navigate(`/shopping?category=${c}`);
    }

   return (<>
      <Button onClick={()=>changeCategory('daily')}>יום יום</Button>
      <Button onClick={()=>changeCategory('brail')}>ברייל</Button>
      <Button onClick={()=>changeCategory('medical')}>רפואי</Button>
      <Button onClick={()=>changeCategory('kitchen')}>מטבח</Button>
      <Button onClick={()=>changeCategory('mobility')}>ניידות</Button>
      <Button onClick={()=>changeCategory('ICamera')}>הפיתוח שלנו</Button>
   </>
   )
}
export default Categories; 
