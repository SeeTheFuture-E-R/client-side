import { EventSeatRounded } from "@mui/icons-material";
import MailFriend from "./MailToFriends";
import { Link } from "react-router-dom"
import Development from './development' 
import Friend from "./friends";
import { useState } from "react";
import axios from 'axios';
import "./style.css"

function Friends() {
    const [development, setDevelopment]=useState(false)
    
  const startTrial = async () => {
    const res = await axios.post('http://localhost:8000/02');
    console.log(res.data);
  };

    function start(){
      window.open(window.location.href);
        startTrial()
        setDevelopment(true)
    }
    
{/* <div className="component-wrapper">
                      <MailFriend />
                  </div> */}

    return (
      <div>
          {!development ? (     
        <div className="main-container">
        <div className="top-section-container">
            <div className="component-wrapper">
                <h2>הפיתוח שלנו - טכנולוגיה שמחברת אנשים</h2>
                <p>
                    הפיתוח שלנו הוא מערכת חדשנית המיועדת לסייע לאנשים עם לקות ראייה לזהות את היקרים להם בסביבתם הקרובה. 
                    המערכת משלבת טכנולוגיית זיהוי פנים מתקדמת עם חוויית משתמש נגישה ופשוטה.
                </p>
                <p>
                    המערכת מהווה גשר טכנולוגי המחבר בין אנשים עם לקות ראייה לסביבתם החברתית, 
                    ומאפשרת להם לנהל אינטראקציות חברתיות בצורה טבעית ונוחה יותר.
                </p>
            </div>
    
            <div className="component-wrapper">
                <h2>איך זה עובד?</h2>
                <ul>
                    <li>המשתמש מזמין את חבריו ובני משפחתו להעלות את תמונותיהם למערכת</li>
                    <li>המערכת לומדת לזהות כל אדם בצורה מדויקת</li>
                    <li>כאשר אדם מזוהה, המערכת מודיעה למשתמש מיידית מי נמצא בקרבתו</li>
                </ul>
            </div>
        </div>
    
        <div className="friends-section">
            <div className="component-wrapper full-width">
                <Friend />
            </div>
        </div>
    
        <button className="start-button" onClick={start}>
            להתחיל בניסיון
        </button>
    </div>
          ) : (
              <div className="component-wrapper">
                  <Development />
              </div>
          )}
      </div>
  );
  };


export default Friends

{/* <ICameraOn></ICameraOn> */}