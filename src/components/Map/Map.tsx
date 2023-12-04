import React, { useMemo } from 'react'

import { Flex, Loader } from '@mantine/core'
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api'

const Map = ({ coordinates }: MapPropsType) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY as string,
  })

  const center = useMemo(() => coordinates[0], [coordinates])
  const places = useMemo(
    () => coordinates.map((p, i) => <MarkerF key={i} position={p} title={p.title} />),
    [coordinates]
  )

  return (
    <Flex align={'center'} h={'300px'} justify={'center'} m={'30px 0'} w={'100%'}>
      {isLoaded ? (
        <GoogleMap
          center={center}
          mapContainerClassName={'map-container'}
          mapContainerStyle={{ height: '100%', width: '100%' }}
          zoom={10}
        >
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
