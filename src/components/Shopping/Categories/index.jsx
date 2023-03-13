
import { colors } from "@mui/material";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
function Categories(props) {
   //const [category, setCategory] = useState("daily")
    const navigate = useNavigate()
   useEffect(() => {
   })
   return (<>
      <Button onClick={()=>{navigate("/shopping?category=daily")}}>יום יום</Button>
      <Button onClick={()=>{navigate("/shopping?category=brail") }}>ברייל</Button>
      <Button onClick={()=>{navigate("/shopping?category=medical") }}>רפואי</Button>
      <Button onClick={()=>{navigate("/shopping?category=kitchen") }}>מטבח</Button>
      <Button onClick={()=>{navigate("/shopping?category=mobility") }}>ניידות</Button>
      <Button onClick={()=>{navigate("/shopping?category=ICamera") }}>הפיתוח שלנו</Button>
   </>
   )
}
export default Categories; 