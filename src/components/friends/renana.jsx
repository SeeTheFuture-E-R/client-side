/*global google*/

import { TextField, Button } from "@mui/material"
import { useState, useContext } from "react"
import axios from "axios";
import { AuthContext } from "../context/authContext";
import CircularIntegration from "../Field/loadingButton";

// 
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
// 

function MailFreind() {

    // 
    const defaultLocation = { lat: 40.756795, lng: -73.954298 };
    let destination = { lat: 41.756795, lng: -78.954298 };
    let origin = { lat: 40.756795, lng: -73.954298 };
    let directionsService;
    // 

    const [direction, setDirection] = useState(null);
    const [bounds, setBounds] = useState();

   const onMapLoad = map => {
        directionsService = new google.maps.DirectionsService();
        //load default origin and destination
        changeDirection(origin, destination);
    };

    //function that is calling the directions service
    const changeDirection = (origin, destination) => {
        directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    //changing the state of directions to the result of direction service
                    setDirection(result)
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    };

    // /////////////////////////////


    const [friendList, setFreindList] = useState([]);
    const [email, setEmail] = useState("");
    const [massage, setMassage] = useState("");

    let { currentUser, token } = useContext(AuthContext);

    const sendMail = async () => {

        console.log(friendList)
        try {
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }
            let body = {
                "mailList": friendList,
                "massage": massage,
                "subject": "help your freind"
            }
            const res = await axios.post('http://localhost:9660/mail', body, config);
            console.log(res.data)
            return res.status


        } catch (err) {
            console.log(err)
            //   setErr(err.response.data?.message);
        }
    }

    return (
        <>
            תרצה שנעשה לך את העבודה?<br></br>
            הכנס את המיילים של האנשים שרצה לקבל מהם תמונות<br></br>
            <TextField onChange={(e) => setEmail(e.target.value)} label={"הכנס כתובת מייל"} variant="outlined" required />
            <Button onClick={() => { setFreindList([...friendList, email]); console.log(friendList, email) }}>הוסף</Button>
            <div>
                <TextField onChange={(e) => setMassage(e.target.value)} label={"מסר שאתה רוצה לכתוב לחברים שלך"} variant="outlined" required />
                <CircularIntegration sendMail={sendMail}></CircularIntegration>
            </div>

            {/*  */}
            <div>
                <GoogleMap
                    center={defaultLocation}
                    zoom={5}
                    onLoad={map => this.onMapLoad(map)}
                    mapContainerStyle={{ height: "400px", width: "800px" }}
                >
                    {direction && (
                        <DirectionsRenderer directions={direction} />
                    )}
                </GoogleMap>
            </div>


            {/*  */}


        </>
    )
}

export default MailFreind
