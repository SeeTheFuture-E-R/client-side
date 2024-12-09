import React, { useState, useContext } from 'react';
import { Button, IconButton, Tooltip, Popover, Typography } from '@mui/material';
import { Accessibility, TextFields, Contrast, Restore, InvertColors, Mouse } from '@mui/icons-material';
import './accessibilitySidebar.css'; // ייבוא קובץ ה-CSS
  import { AuthContext } from "../context/authContext"

function AccessibilitySidebar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
    let { theme , changeTheme} = useContext(AuthContext);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="accessibility-sidebar">
      <IconButton onClick={handleClick} className="accessibility-toggle-button">
        <Accessibility fontSize="large" />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        className="accessibility-popover"
      >
        <div className="accessibility-options">
          <Tooltip title="הגברת ניגודיות">
            <Button className="accessibility-button" variant="contained" onClick={() => changeTheme('high-contrast')}>
              <Contrast fontSize="small" />
              <Typography variant="caption">ניגודיות</Typography>
            </Button>
          </Tooltip>
          <Tooltip title="שינוי גודל טקסט">
            <Button className="accessibility-button" variant="contained" onClick={() =>changeTheme('large-font')}>
              <TextFields fontSize="small" />
              <Typography variant="caption">טקסט</Typography>
            </Button>
          </Tooltip>
          <Tooltip title="שחור לבן">
            <Button className="accessibility-button" variant="contained" onClick={() => changeTheme('black-white')}>
              <InvertColors fontSize="small" />
              <Typography variant="caption">שחור לבן</Typography>
            </Button>
          </Tooltip>
          <Tooltip title="גודל סמן">
            <Button className="accessibility-button" variant="contained">
              <Mouse fontSize="small" />
              <Typography variant="caption" onClick={() => changeTheme('large-cursor')}>גודל סמן</Typography>
            </Button>
          </Tooltip>
          <Tooltip title="היפוך צבעים">
            <Button className="accessibility-button" variant="contained" onClick={() => changeTheme('inverted')}>
              <InvertColors fontSize="small" />
              <Typography variant="caption">היפוך צבעים</Typography>
            </Button>
          </Tooltip>
          <Tooltip title="איפוס">
            <Button className="accessibility-button" variant="contained" onClick={() => changeTheme('')}>
              <Restore fontSize="small" />
              <Typography variant="caption">איפוס</Typography>
            </Button>
          </Tooltip>
        </div>
      </Popover>
    </div>
  );
}

export default AccessibilitySidebar;
