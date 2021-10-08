import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

function MapContainer(props) {
  console.log(props.data);
  const onMarkerClick  = () => {
    console.log("here");
  }
  const onInfoWindowClose = () => {
    console.log("here");
  }
  const style = {
    width: '80%',
    height: '350px',
    marginLeft:"auto",
    marginRight:"auto",
    marginTop:"20px"
  }
    return (
        <div className="map">            
            <Map google={props.google} zoom={14}
            style={style}
            initialCenter={{
                lat:  props.data.lat,
                lng:  props.data.long 
            }}>            
                <Marker onClick={onMarkerClick}name={'Current location'} />
                <InfoWindow onClose={onInfoWindowClose}>
                    <div>
                    </div>
                </InfoWindow>
            </Map>
        </div>
    );
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyACZVjVXGiila8sWD-MEh-omZt5C_hLugM"
})(MapContainer)