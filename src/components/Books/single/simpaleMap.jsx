import { Icon } from '@iconify/react'
import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";

import {
   GoogleMap,
   useJsApiLoader,
  Marker,

} from "@react-google-maps/api";


Geocode.setApiKey("AIzaSyAtQpEDudWMrZBVUyiEiJeVdOWeXQMW-uI");

const Map = ({address}) => 
{
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAtQpEDudWMrZBVUyiEiJeVdOWeXQMW-uI",
    zoom : 12
  });


 
  const [center, setCenter] = useState()

  // const l = { "lat": 31.765556, "lng": 35.185868 }
  const getLongitudeLatitude = async () => {
    if (!center) {
      console.log(address)
      const res = await Geocode.fromAddress(address);
      console.log(res)
      console.log(address + " " + res.results[0].geometry)
      setCenter(res.results[0].geometry.location)
    }
  }
  const containerStyle = {
  width: '550px',
  height: '550px'
};
  
  useEffect(() => { getLongitudeLatitude() }, [center]);
  
  
  return (isLoaded ? <>

    <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
        markerId='1'
      >
        <Marker id={1} key={1} position={center} title={"the book"}><Icon  className="pin-icon" /></Marker> 
      </GoogleMap>

  </>:<></>
  );
};
export default Map;




