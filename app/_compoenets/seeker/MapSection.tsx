"use client"
import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import MarkerItem from './MarkerItem';

const containerStyle = {
  width: '100%',
  height: '80vh',
  borderRadius: '10'
};
const center = {
  lat: 33.8869,
  lng: 9.5375
};

function MapSection({ proposals } : {proposals: any}) {

  const [map, setMap] = useState(null)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY || ''
  })

  const onLoad = React.useCallback(function callback(map : any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map : any) {
    setMap(null)
  }, [])

  return (
    <div>
      {proposals && proposals.length > 0 && isLoaded &&
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={proposals[0].coordinates || center}
          zoom={5}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {proposals.map((item: any, index : number) => (
            <MarkerItem key={index} item={item} />
          ))}
        </GoogleMap>

      }
      {!isLoaded && <div className='bg-gray-100 h-[80vh] w-full flex items-center justify-center'>
        Loading...
      </div>}
    </div>
  )
}

export default MapSection