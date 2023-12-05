import React, { useMemo } from 'react'

import { Flex, Loader } from '@mantine/core'
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api'

import { MAP } from '../../const/settings'
import { useStyles } from './style'

const Map = ({ coordinates }: MapPropsType) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY as string,
  })
  const { classes } = useStyles()
  const center = useMemo(() => coordinates[0], [coordinates])
  const places = useMemo(
    () => coordinates.map((p, i) => <MarkerF key={i} position={p} title={p.title} />),
    [coordinates]
  )

  return (
    <Flex className={classes.map}>
      {isLoaded ? (
        <GoogleMap center={center} mapContainerClassName={classes.mapContainer} zoom={MAP.ZOOM}>
          {places}
        </GoogleMap>
      ) : (
        <Loader />
      )}
    </Flex>
  )
}

export default React.memo(Map)

type MapPropsType = {
  coordinates: Array<{
    lat: number
    lng: number
    title: string
  }>
}
