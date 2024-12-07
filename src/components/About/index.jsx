import SimpaleMap from '../Books/single/simpaleMap'

function About(props) {
    return (
        <div className="about-wrapper">
            <h2>אודותינו</h2>
            <div className="about-content">
                מפעלינו התחיל מפרויקט גמר במחשבים משולב בינה מלאכותית
            </div>
            <div className="location-section">
                מקומינו:
                <br/>
                <div className="map-container" style={{
                    width: "900px",
                    height: "700px",
                    margin: "20px 0"
                }}>
                    <SimpaleMap address={"מלכי ישראל 57, ירושלים"} />
                </div>
            </div>
        </div>
    );
}

export default About;