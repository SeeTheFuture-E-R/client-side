import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import Geocode from "react-geocode";
import '../Books.css';

function Map({ address }) {
    const [coordinates, setCoordinates] = useState(null);
    const [infoWindowOpen, setInfoWindowOpen] = useState(false);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
        language: 'he', // שפה: עברית
        region: 'IL',   // מיקוד תוצאות לאזור ישראל
    });

    useEffect(() => {
        if (isLoaded) {
            Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_KEY);
            Geocode.setLanguage('he'); // קביעת שפה לעברית

            Geocode.fromAddress(address).then(
                (response) => {
                    if (response.results.length > 0) {
                        const { lat, lng } = response.results[0].geometry.location;
                        setCoordinates({ lat, lng });
                    } else {
                        console.warn("לא נמצאו תוצאות לכתובת שסופקה.");
                    }
                },
                (error) => {
                    console.error("שגיאה בקבלת הקואורדינטות:", error.message);
                }
            );
        }
    }, [address, isLoaded]);

    const mapStyles = {
        height: "100%",
        width: "100%"
    };

    const defaultCenter = {
        lat: 31.7683, // מרכז ברירת מחדל (ישראל)
        lng: 35.2137
    };

    if (!isLoaded) {
        return <div>טוען...</div>;
    }

    return (
        <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={15}
            center={coordinates || defaultCenter}
            options={{
                scaleControl: true,
                mapTypeId: 'terrain',
            }}
        >
            {coordinates && (
                <>
                    <Marker
                        position={coordinates}
                        onClick={() => setInfoWindowOpen(true)}
                    />
                    {infoWindowOpen && (
                        <InfoWindow
                            position={coordinates}
                            onCloseClick={() => setInfoWindowOpen(false)}
                        >
                            <div>
                                <b>{address}</b>
                            </div>
                        </InfoWindow>
                    )}
                </>
            )}
        </GoogleMap>
    );
}

export default Map;
