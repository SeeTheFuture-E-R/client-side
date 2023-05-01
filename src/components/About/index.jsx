import SimpaleMap from '../Books/single/simpaleMap'
function About(props) {
    return (<>
    אודותינו
    <div>
        מפעלינו התחיל מפרויקט גמר במחשבים משולב בינה מלאכותית
        </div>
        מקומינו:
        <br/>
        <div style={{"width":"300px"}}><SimpaleMap address={"מלכי ישראל 57, ירושלים"}></SimpaleMap></div>
        </>)
}

export default About