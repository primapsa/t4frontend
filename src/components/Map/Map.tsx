import React from 'react';
import {GoogleMap, MarkerF, useLoadScript} from "@react-google-maps/api";
import {Loader} from '@mantine/core';

const Map = ({coordinates}: MapPropsType) => {

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: '',
    });
    //AIzaSyDPif_2RLdimRxXRC3LwWxgnpwiK1Y-5Vc
    const center = coordinates[0]
    const places = coordinates.map((p, i) => <MarkerF position={p} key={i}  title={p.title} />)
    if (!isLoaded) {
        return <Loader/>
    }
    return (
        <div style={{width: '1000px', height: '500px'}}>
            {isLoaded &&
                <GoogleMap
                    mapContainerClassName="map-container"
                    mapContainerStyle={{width: '100%', height: '100%'}}
                    center={center}
                    zoom={10}
                >
                    {places}
                </GoogleMap>
            }
        </div>
    );
};
type MapPropsType = {
    coordinates: Array<{
        lat: number
        lng: number
        title: string
    }>
}
export default Map
