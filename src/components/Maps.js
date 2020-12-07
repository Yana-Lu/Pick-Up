import React, { useEffect, useState, useCallback } from 'react'
import { showEvent } from './Firebase'
import styles from '../scss/Map.module.scss'
import MapStyles from './MapStyles'
import { GoogleMap, useLoadScript, Marker, InfoWindow, Data } from '@react-google-maps/api'
import Swal from 'sweetalert2'
import { JoinForm } from './JoinForm'
import { EventForm } from './EventForm'
import { ShowMarkerData } from './EventPage'

const libraries = ['places']
const mapContainerStyle = {
  width: '100%',
  height: '100%',
}
const center = {
  lat: 23.79794304425684,
  lng: 120.92169897361532,
}

const options = {
  styles: MapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: true,
}

export function showMarkerData(obj) {}
export function Maps(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `AIzaSyAhDv35adlrxazUwPtZvjU7NE3RAaq3piQ`,
    libraries,
  })
  //render畫面用
  const [events, setEvents] = useState([])

  useEffect(() => {
    showEvent(setEvents)
  }, [])

  console.log(events)
  //render markers
  const [markers, setMarkers] = useState([])
  //click to choose new location
  const [newMarker, setNewMarker] = useState([])
  let allMarkers = []
  // function onMapload() {
  events.forEach((event) => {
    allMarkers.push({
      eventId: event.eventId,
      title: event.title,
      hostName: event.hostName,
      email: event.email,
      phone: event.phone,
      startDate: event.startDate,
      endDate: event.endDate,
      memberLimit: event.memberLimit,
      lat: event.lat,
      lng: event.lng,
      time: new Date(event.startDate),
      status: event.status,
    })
  })
  console.log(markers)

  const onMapClick = useCallback((event) => {
    setNewMarker(() => [
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ])
    console.log(event.latLng.lat())
    console.log(event.latLng.lng())
  }, [])

  // const mapRef = React.useRef()
  // const onMapLoad = React.useCallback((map) => {
  //   mapRef.current = map
  // }, [])

  const [selected1, setSelected1] = useState(null)
  const [selected2, setSelected2] = useState(null)

  if (loadError) return 'Error loading maps'
  if (!isLoaded) return 'Loading Maps'
  // function ShowMarkerData(obj) {
  //   console.log(obj)
  // }

  function showJoinForm() {
    // console.log()
    let user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: '請先登入喔!',
      })
    } else {
      let closePopup = document.getElementById('joinForm')
      closePopup.style.display = 'block'
    }
  }
  function showEventForm() {
    let user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      Swal.fire({
        icon: 'warning',
        title: '請先登入喔!',
      })
    } else {
      let closePopup = document.getElementById('eventForm')
      closePopup.style.display = 'block'
    }
  }
  console.log(allMarkers)
  return (
    <div className={styles.map}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        // onLoad={onMapLoad}
      >
        {allMarkers.map((marker) => (
          <Marker
            key={marker?.time?.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected1(marker)
              ShowMarkerData(selected1)
            }}
          />
        ))}
        {newMarker.map((marker) => (
          <Marker
            key={marker?.time?.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected2(marker)
            }}
          />
        ))}
        {selected1 ? (
          <InfoWindow position={{ lat: selected1.lat, lng: selected1.lng }} onCloseClick={() => setSelected1(null)}>
            <div>
              <h3 className={styles.openForm} onClick={showJoinForm}>
                我要跟團
              </h3>
            </div>
          </InfoWindow>
        ) : null}

        {selected2 ? (
          <InfoWindow position={{ lat: selected2.lat, lng: selected2.lng }} onCloseClick={() => setSelected2(null)}>
            <div>
              <h3 className={styles.openForm} onClick={showEventForm}>
                我要開團
              </h3>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      <JoinForm event={selected1} />
      <EventForm location={newMarker} />
    </div>
  )
}
