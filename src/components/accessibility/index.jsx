import React, { useState } from 'react';
import { Button, Menu, MenuItem, IconButton } from '@mui/material';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import HighlightIcon from '@mui/icons-material/Highlight';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import CloseIcon from '@mui/icons-material/Close';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import PaletteIcon from '@mui/icons-material/Palette';
import BrightnessLowIcon from '@mui/icons-material/BrightnessLow';
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import './accessibilitySidebar.css';

const AccessibilitySidebar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [fontSizeIncrement, setFontSizeIncrement] = useState(0);
    const [isInverted, setIsInverted] = useState(false);
    const [isReading, setIsReading] = useState(false);
    const [isBlackAndWhite, setIsBlackAndWhite] = useState(false);
    const [brightnessLevel, setBrightnessLevel] = useState(1); // ערך הבהירות המוגדר
    const [synth] = useState(window.speechSynthesis);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEnlargeText = () => {
        setFontSizeIncrement((prev) => prev + 0.1);
        document.documentElement.style.fontSize = `${1 + fontSizeIncrement + 0.1}em`;
    };

    const resetAccessibility = () => {
        document.documentElement.style.fontSize = `1em`;
        document.body.classList.remove('invert-colors', 'black-and-white');
        document.body.style.filter = 'brightness(1)';
        document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((headline) => {
            headline.style.backgroundColor = 'transparent';
        });
        setFontSizeIncrement(0);
        setIsInverted(false);
        setIsBlackAndWhite(false);
        setBrightnessLevel(1);
        stopReading();
        handleClose(); // סגירת התפריט
    };
  

    const toggleInvertColors = () => {
        if (isInverted) {
            document.body.classList.remove('invert-colors');
        } else {
            document.body.classList.add('invert-colors');
        }
        setIsInverted(!isInverted);
    };

    const toggleBlackAndWhite = () => {
        if (isBlackAndWhite) {
            document.body.classList.remove('black-and-white');
        } else {
            document.body.classList.add('black-and-white');
        }
        setIsBlackAndWhite(!isBlackAndWhite);
    };

    const highlightHeadlines = () => {
        const headlines = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headlines.forEach((headline) => {
            headline.style.backgroundColor = 'yellow';
        });
    };

    const increaseBrightness = () => {
        const newLevel = Math.min(brightnessLevel + 0.1, 2); // עד מקסימום של 2
        document.body.style.filter = `brightness(${newLevel})`;
        setBrightnessLevel(newLevel);
    };

    const decreaseBrightness = () => {
        const newLevel = Math.max(brightnessLevel - 0.1, 0.5); // עד מינימום של 0.5
        document.body.style.filter = `brightness(${newLevel})`;
        setBrightnessLevel(newLevel);
    };


    const readText = () => {
        if ('speechSynthesis' in window) {
            const text = document.body.innerText;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.onend = () => {
                setIsReading(false);
            };
            synth.speak(utterance);
            setIsReading(true);
        } else {
            alert('Your browser does not support text-to-speech.');
        }
    };

    const stopReading = () => {
        synth.cancel();
        setIsReading(false);
    };

    return (
        <div className="accessibility-button">
            {isReading && (
                <IconButton
                    className="reading-icon"
                    onClick={stopReading}
                    color="primary"
                >
                    <VolumeOffIcon />
                </IconButton>
            )}
            <Button
                className="accessibility-button"
                aria-controls="accessibility-menu"
                aria-haspopup="true"
                onClick={handleClick}
                variant="contained"
                color="primary"
            >
                <AccessibleForwardIcon />
            </Button>
            <Menu
                id="accessibility-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={readText}>
                    <VisibilityIcon /> קרא טקסט
                </MenuItem>
                <MenuItem onClick={highlightHeadlines}>
                    <HighlightIcon /> הדגש כותרות
                </MenuItem>
                <MenuItem onClick={handleEnlargeText}>
                    <FormatSizeIcon /> הגדלת טקסט
                </MenuItem>
                <MenuItem onClick={toggleInvertColors}>
                    <InvertColorsIcon /> הפוך צבעים
                </MenuItem>
                <MenuItem onClick={toggleBlackAndWhite}>
                    <PaletteIcon /> שחור לבן
                </MenuItem>
                <MenuItem onClick={increaseBrightness}>
                    <BrightnessHighIcon /> הגדל בהירות
                </MenuItem>
                <MenuItem onClick={decreaseBrightness}>
                    <BrightnessLowIcon /> הקטן בהירות
                </MenuItem>
                <MenuItem onClick={resetAccessibility}>
                    <CloseIcon /> איפוס
                </MenuItem>
            </Menu>
        </div>
    );
};

export default AccessibilitySidebar;
