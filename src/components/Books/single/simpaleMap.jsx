import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import Geocode from "react-geocode";

function Map({ address }) {
    const [coordinates, setCoordinates] = useState(null);
    
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBlaEbbWfIfFEFg5TV0uSOKHVemMAmsuIc"
    });
    
    useEffect(() => {
        Geocode.setApiKey("AIzaSyBlaEbbWfIfFEFg5TV0uSOKHVemMAmsuIc");
        
        Geocode.fromAddress(address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setCoordinates({ lat, lng });
            },
            (error) => {
                console.error("Error getting coordinates:", error);
            }
        );
    }, [address]);

    const mapStyles = {
        height: "100%",
        width: "100%"
    };

    const defaultCenter = {
        lat: 31.7683, // Default center (Israel)
        lng: 35.2137
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={15}
            center={coordinates || defaultCenter}
        >
            {coordinates && <Marker position={coordinates} />}
        </GoogleMap>
    );
}

export default Map;

