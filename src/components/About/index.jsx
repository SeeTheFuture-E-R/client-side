import SimpaleMap from '../Books/single/simpaleMap'
import "./style.css"
function About(props) {
    return (
        <div className="about-wrapper">
    <h2>אודותינו</h2>
    <div className="about-content">
        <p className="about-intro">
            "SEE-THE-FUTURE" נולדה מתוך חזון להפוך את העולם למקום נגיש יותר, צעד אחר צעד
        </p>
        
        <div className="about-story">
            <h3>הסיפור שלנו</h3>
            <p>
                התחלנו את דרכנו כפרויקט גמר במסלול מדעי המחשב, עם התמחות בבינה מלאכותית. 
                מה שהחל כרעיון אקדמי, הפך במהרה לחזון של שינוי חברתי משמעותי.
            </p>
        </div>

        <div className="about-mission">
            <h3>המשימה שלנו</h3>
            <p>
                אנו מאמינים שטכנולוגיה צריכה לשרת את האנושות ולחבר בין אנשים. 
                המערכת שלנו משלבת את הטכנולוגיות המתקדמות ביותר בתחום הבינה המלאכותית 
                כדי לאפשר לאנשים עם לקות ראייה לחוות את העולם החברתי במלואו.
            </p>
        </div>

        <div className="about-features">
            <h3>הייחודיות שלנו</h3>
            <ul>
                <li>זיהוי פנים מתקדם בזמן אמת</li>
                <li>ממשק משתמש ידידותי ונגיש</li>
                <li>תמיכה במספר מצלמות במקביל</li>
                <li>פרטיות מלאה למשתמשים</li>
                <li>התראות קוליות מותאמות אישית</li>
            </ul>
        </div>

        <div className="about-vision">
            <h3>החזון שלנו</h3>
            <p>
                אנו שואפים ליצור עולם שבו טכנולוגיה מגשרת על פערים חברתיים ומאפשרת לכל אדם 
                לחוות אינטראקציות חברתיות באופן טבעי ונגיש. כל צעד קטן בדרך הזו הוא צעד גדול 
                לקראת חברה מכילה ומחבקת יותר.
            </p>
        </div>
        <div className="about-vision">
            <h3>מיקומינו</h3>
            <div className="map-container" style={{
                    width: "900px",
                    height: "700px",
                    margin: "20px 0"
                }}>
                    <SimpaleMap address={"מלכי ישראל 57, ירושלים"} />
                </div>
        </div>
        
    </div>
</div>
    );
}

export default About;