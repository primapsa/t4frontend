import React, {useMemo} from 'react';
import {GoogleMap, MarkerF, useLoadScript} from "@react-google-maps/api";
import {Flex, Loader} from '@mantine/core';

const Map = ({coordinates}: MapPropsType) => {

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: '',
    });
    //AIzaSyDPif_2RLdimRxXRC3LwWxgnpwiK1Y-5Vc
    const center = useMemo(() => coordinates[0], [coordinates])
    const places = useMemo(() =>
        coordinates.map((p, i) =>
            <MarkerF position={p} key={i} title={p.title}/>), [coordinates])

    return (
        <Flex align={'center'} h={'300px'} w={'100%'} justify={'center'}>
            {isLoaded ?
                <GoogleMap
                    mapContainerClassName="map-container"
                    mapContainerStyle={{width: '100%', height: '100%'}}
                    center={center}
                    zoom={10}>
                    {places}
                </GoogleMap>
                :
                <Loader/>
            }
        </Flex>
    );
};
export default React.memo(Map)


type MapPropsType = {
    coordinates: Array<{
        lat: number
        lng: number
        title: string
    }>
}