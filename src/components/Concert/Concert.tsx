import React, {useEffect, useMemo, useState} from 'react';
import {GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api";
import {Paper, Title, Text, Flex} from '@mantine/core';
import Item from "../Item/Item";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, RootStateType} from "../../redux/store";
import {ConcertsType} from "../../api/api";
import {useParams} from "react-router-dom";
import {fetchConcert} from "../../redux/concertReducer";
import {Loader} from '@mantine/core';
import {AppStatus} from "../../redux/appReducer";
import {STATUS} from "../../const/statuses";

const Concert = () => {
    const [isLoading, setIsLoading] = useState(false)
    const {id} = useParams()
    const concert = useSelector<RootStateType, ConcertsType>(state => state.concert.item)
    const status = useSelector<RootStateType, AppStatus>(state => state.app.status)
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: 'AIzaSyDPif_2RLdimRxXRC3LwWxgnpwiK1Y-5Vc',
    });

    const place = {lat: parseFloat(concert.latitude), lng: parseFloat(concert.longitude)} as const
    const dispatch = useDispatch()
    useEffect(() => {
        if (id) {
            dispatch<AppDispatchType>(fetchConcert(parseInt(id, 10)))
        }

    }, [])
    useEffect(() => {
        if (isLoaded && status === STATUS.IDLE) {
            setIsLoading(true)
        }
    }, [status, isLoaded])
    if (!isLoading) {
        return <Loader/>
    }
    return (
        <Paper>
            <Item {...concert}/>
            <div className="App" style={{width: '500px', height: '500px'}}>
                {isLoaded &&
                    <GoogleMap
                        mapContainerClassName="map-container"
                        mapContainerStyle={{width: '100%', height: '100%'}}
                        center={place}
                        zoom={10}
                    >
                        <MarkerF position={place}/>
                    </GoogleMap>}
            </div>
        </Paper>
    );
};

export default Concert
