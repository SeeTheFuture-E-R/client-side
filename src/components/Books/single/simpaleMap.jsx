import { Icon } from '@iconify/react'
import React, { useEffect, useState } from "react";
import Geocode from "react-geocode";

import {
//   GoogleMap,
//   useJsApiLoader,
  Marker,
//   DirectionsRenderer,
//   DistanceMatrixService,
//   InfoWindow,
//   Polyline
} from "@react-google-maps/api";


import GoogleMapReact from "google-maps-react";
import { CircularProgress } from '@mui/material';
Geocode.setApiKey("AIzaSyAtQpEDudWMrZBVUyiEiJeVdOWeXQMW-uI");
// const Marker = props => {
//   return <div className="SuperAwesomePin"></div>
// }
const Map = ({address}) => 
{
  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: "AIzaSyAtQpEDudWMrZBVUyiEiJeVdOWeXQMW-uI",
  //   zoom : 12
  // });

  //   const marker = new AdvancedMarkerView({
  //   map: map,
  //   position: center,
  //   title: 'the book is here'
  // });

  const [center, setCenter] = useState()
  // const l = { "lat": 31.765556, "lng": 35.185868 }
  const f = async () => {
    if (!center) {
      console.log(address)
      const res = await Geocode.fromAddress(address);
      console.log(res)
      console.log(address + " " + res.results[0].geometry)
      setCenter(res.results[0].geometry.location)
    }
  }
  // const renderMarkers=(map, maps)=> {
  //   let marker = new Marker({
  //     position: center,
  //     map,
  //     title: 'Hello World!'
  //   });
  //   return marker;
  // }
  useEffect(() => { f() }, [center]);

  const [load, setLoad] = useState(true)
  return (<>
    {/* {isLoaded} */}
{/* {load&&<CircularProgress/>} */}

    <GoogleMapReact google={window.google}

      defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
      defaultZoom={18}
      center={center}
      yesIWantToUseGoogleMapApiInternals
      markerId='1'
      markerColor="green"
      zoom={18}
    onLoad = {()=>setLoad(false)}
    >
       <Marker id={1} key={1} position={center} title={"the book"}><Icon  className="pin-icon" /></Marker> 
    </GoogleMapReact>

  </>
  );
};
export default Map;


