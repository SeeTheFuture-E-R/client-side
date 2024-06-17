import { Icon } from '@iconify/react'
import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";
import {
   GoogleMap,
   useJsApiLoader,
   Marker,
} from "@react-google-maps/api";

Geocode.setApiKey("AIzaSyDfnY7GcBdHHFQTxRCSJGR-AGUEUnMBfqo");

const Map = ({ address }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDfnY7GcBdHHFQTxRCSJGR-AGUEUnMBfqo",
    zoom: 12
  });

  const [center, setCenter] = useState(null);

  const getLongitudeLatitude = async () => {
    if (!center) {
      try {
        const res = await Geocode.fromAddress(address);
        const location = res.results[0].geometry.location;
        setCenter({ lat: location.lat, lng: location.lng });
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    }
  };

  useEffect(() => {
    getLongitudeLatitude();
  }, [address]);

  const containerStyle = {
    width: '550px',
    height: '550px'
  };

  return (
    isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        <Marker position={center} title={"the book"}>
          <Icon className="pin-icon" />
        </Marker> 
      </GoogleMap>
    ) : null
  );
};

export default Map;


// const { isLoaded } = useJsApiLoader({
//   id: 'google-map-script',
//   googleMapsApiKey: "YOUR_API_KEY"
// })

// const [map, setMap] = React.useState(null)

// const onLoad = React.useCallback(function callback(map) {
//   // This is just an example of getting and using the map instance!!! don't just blindly copy!
//   const bounds = new window.google.maps.LatLngBounds(center);
//   map.fitBounds(bounds);

//   setMap(map)
// }, [])

// const onUnmount = React.useCallback(function callback(map) {
//   setMap(null)
// }, [])

// return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={10}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//     >
//       { /* Child components, such as markers, info windows, etc. */ }
//       <></>
//     </GoogleMap>
// ) : <></>
// }




