import React, { useState, useContext } from 'react';
import { Button, IconButton, Tooltip, Popover, Typography } from '@mui/material';
import { Accessibility, TextFields, Contrast, Restore, InvertColors, Mouse } from '@mui/icons-material';
//import './accessibilitySidebar.css'; // ייבוא קובץ ה-CSS
  import { AuthContext } from "../context/authContext"

  function AccessibilitySidebar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { theme, changeTheme } = useContext(AuthContext);
  
    const handleClick = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const accessibilityOptions = [
      {
        title: "הגברת ניגודיות",
        theme: "high-contrast",
        icon: <Contrast fontSize="small" />,
        label: "ניגודיות"
      },
      {
        title: "שינוי גודל טקסט",
        theme: "large-font",
        icon: <TextFields fontSize="small" />,
        label: "טקסט"
      },
      {
        title: "שחור לבן",
        theme: "black-white",
        icon: <InvertColors fontSize="small" />,
        label: "שחור לבן"
      },
      {
        title: "גודל סמן",
        theme: "large-cursor",
        icon: <Mouse fontSize="small" />,
        label: "גודל סמן"
      },
      {
        title: "היפוך צבעים",
        theme: "inverted",
        icon: <InvertColors fontSize="small" />,
        label: "היפוך צבעים"
      },
      {
        title: "איפוס",
        theme: "",
        icon: <Restore fontSize="small" />,
        label: "איפוס"
      }
    ];
  
    return (
      <div className="accessibility-sidebar">
        <IconButton 
          onClick={handleClick} 
          className="accessibility-toggle-button"
          aria-label="פתח תפריט נגישות"
        >
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
          <div className="accessibility-options" role="menu">
            {accessibilityOptions.map((option) => (
              <Tooltip key={option.theme} title={option.title}>
                <Button
                  className="accessibility-button"
                  variant="contained"
                  onClick={() => {
                    changeTheme(option.theme);
                    handleClose();
                  }}
                  role="menuitem"
                  aria-label={option.title}
                >
                  {option.icon}
                  <Typography variant="caption">{option.label}</Typography>
                </Button>
              </Tooltip>
            ))}
          </div>
        </Popover>
      </div>
    );
  }
  
  export default AccessibilitySidebar;

