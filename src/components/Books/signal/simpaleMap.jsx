import React, { useEffect , useState} from "react";
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon  className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
)

function SimpleMap (){
    
    const location = {
        address: 'my home',
        lat: 31.765556,
        lng: 35.186858,
      }
    const [map,setMap]=useState("")
    // const defaultProps = {
    //   center: {
    //     lat: 10.99835602,
    //     lng: 77.01502627
    //   },
    //   zoom: 11
    // };
const getMap=async()=>{
 setMap(  <GoogleMapReact
    bootstrapURLKeys={{ key: 'AIzaSyAtQpEDudWMrZBVUyiEiJeVdOWeXQMW-uI' }}
    defaultCenter={location}
    defaultZoom={13}
  >
    <LocationPin
      lat={location.lat}
      lng={location.lng}
      text={location.address}
    />
  </GoogleMapReact>) 
}
    useEffect(() => {
        getMap()
    }
        , "")

    return (
      // Important! Always set the container height explicitly
    <>maps
      <div style={{ height: '100vh', width: '100%' }}>
        {/* <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAtQpEDudWMrZBVUyiEiJeVdOWeXQMW-uI" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact> */}
{/* 
        <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAtQpEDudWMrZBVUyiEiJeVdOWeXQMW-uI' }}
        defaultCenter={location}
        defaultZoom={13}
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMapReact> */}
      {map}
      </div>
  </> 
    );
  }

export default SimpleMap;

