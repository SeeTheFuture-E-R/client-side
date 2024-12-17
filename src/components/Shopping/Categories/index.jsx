import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
//import './category.css'; // ייבוא קובץ ה-CSS

function Categories() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("daily");

  const handleChange = (event, nextView) => {
    setCategory(nextView);
    changeCategory(nextView);
  };

  function changeCategory(c) {
    navigate(`/shopping?category=${c}`);
  }

  return (
    <ToggleButtonGroup
      className="toggle-button-group"
      orientation="vertical"
      value={category}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton
        className={`toggle-button ${category === "daily" ? "selected" : ""}`}
        value="daily"
      >
        יום יום
      </ToggleButton>
      <ToggleButton
        className={`toggle-button ${category === "brail" ? "selected" : ""}`}
        value="brail"
      >
        ברייל
      </ToggleButton>
      <ToggleButton
        className={`toggle-button ${category === "medical" ? "selected" : ""}`}
        value="medical"
      >
        רפואי
      </ToggleButton>
      <ToggleButton
        className={`toggle-button ${category === "kitchen" ? "selected" : ""}`}
        value="kitchen"
      >
        מטבח
      </ToggleButton>
      <ToggleButton
        className={`toggle-button ${category === "mobility" ? "selected" : ""}`}
        value="mobility"
      >
        ניידות
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default Categories;
