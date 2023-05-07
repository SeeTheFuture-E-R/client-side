// import './category.css'

import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


function Categories() {

   const navigate = useNavigate()

   const [prev, setPrev] = useState(null);
   const [category, setCategory] = useState("daily");


   const handleChange = (event, nextView) => {
      if(prev!=null)
      {
         console.log(prev.target)
      }
      else{
         document.getElementById("daily").sx = Style
      }
      // event.target.sx = {currentStyle}
      setPrev(event)
      setCategory(event.target.value)
      changeCategory(event.target.value)
   };

   function changeCategory(c) {
      navigate(`/shopping?category=${c}`);
   }
   
   const Style = {
      backgroundColor: "pink",
      width: "105px",
      margin:"10px"
   }


   return (<>
      <ToggleButtonGroup
         orientation="vertical"
         value={category}
         exclusive
         onChange={handleChange}
      >
         <ToggleButton id="daily" value="daily" sx={Style}>
            יום יום
         </ToggleButton>
         <ToggleButton value="brail" sx={Style}>
            ברייל
         </ToggleButton>
         <ToggleButton value="medical" sx={Style}>
            רפואי
         </ToggleButton>
         <ToggleButton value="kitchen" sx={Style}>
            מטבח
         </ToggleButton>
         <ToggleButton value="mobility" sx={Style}>
            ניידות
         </ToggleButton>
         <ToggleButton value="ICamera" sx={Style}>
            הפיתוח שלנו
         </ToggleButton>
      </ToggleButtonGroup>
   </>
   )
}
export default Categories;

