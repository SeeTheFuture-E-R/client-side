import { EventSeatRounded } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react"
import { AuthContext } from '../context/authContext';
import MailFriend from "./MailToFriends";
import { Link } from "react-router-dom"
import Development from './development' 
import Friend from "./friends";
import axios from 'axios';
//import "./style.css"

export const productId=1000

function Friends() {
    let { currentUser, token } = useContext(AuthContext);
    const [development, setDevelopment]=useState(false)

    const updateExpirence=async()=>{
        let config = {
            headers: {'Authorization': 'Bearer ' + token}
        }

        const Experiences = await axios.get(`http://localhost:9660/experiences/${currentUser?.id}`, config)
        const expProd = Experiences.data.find(e => e.productId === productId); 

        if (expProd && expProd.expireDate < new Date()) {
            return false;
        }
        if(!expProd){
            let experience= {
                userId: currentUser?.id,
                productId:productId
            }        
            const startExperience = await axios.post('http://localhost:9660/experiences', experience, config)
            console.log(startExperience)
        }
       return true
    }

    const startTrial = async () => {
        const res = await axios.post('http://localhost:8000/02');
        console.log(res.data);
        return res;
      };
    
      const start = async() => {
        const allow = await updateExpirence()
        if(!allow){
            alert("הנסיון שלך יסתים"+'\n' +
                "יש לרכוש את המוצר"
            )
        }
        startTrial();
        setDevelopment(true); 
        window.open(window.location.href);
      };

    return (
      <div>
        {!development ? (     
        <div>
        <div >
            <div className="about">
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
    
            <div className="about">
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