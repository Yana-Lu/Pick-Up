import React, { useEffect, useState, useCallback } from 'react'
import { showEvent } from './Firebase'
import styles from '../scss/Map.module.scss'
import MapStyles from './MapStyles'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
// import { Data } from '@react-google-maps/api'
import Swal from 'sweetalert2'
import { JoinForm } from './JoinForm'
import { EventForm } from './EventForm'

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

export function Maps(props) {
  console.log(props)
  //抓開/跟團指示的對話框以及事件資訊id
  let eventStep1 = document.getElementById('eventStep1')
  let eventStep2 = document.getElementById('eventStep2')
  let eventInfo = document.getElementById('eventInfo')
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
  // eslint-disable-next-line no-unused-vars
  const [markers, setMarkers] = useState([])
  //click to choose new location
  const [newMarker, setNewMarker] = useState([])
  let allMarkers = []
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
    //抓開/跟團指示的對話框以及事件資訊id
    let eventStep1 = document.getElementById('eventStep1')
    let eventStep2 = document.getElementById('eventStep2')
    let eventInfo = document.getElementById('eventInfo')
    if (props.uid) {
      setNewMarker(() => [
        {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          time: new Date(),
        },
      ])
      //開啟開團教學框
      eventStep1.style.display = 'block'
      eventStep2.style.display = 'none'
      eventInfo.style.display = 'none'
      //清除"我要跟團"InfoBox
      setSelected1(null)
    } else {
      setNewMarker([])
    }
  }, [])

  const [selected1, setSelected1] = useState(null)
  const [selected2, setSelected2] = useState(null)

  if (loadError) return 'Error loading maps'
  if (!isLoaded) return 'Loading Maps'
  //Show the data of marker
  function ShowMarkerData(obj) {
    console.log(obj)
    let startDateObj = new Date(obj?.startDate)
    let endDateObj = new Date(obj?.endDate)
    console.log(obj?.startDate)
    console.log(startDateObj)
    let infoTitle = document.getElementById('infoTitle')
    let infoHost = document.getElementById('infoHost')
    let infoEmail = document.getElementById('infoEmail')
    let infoStartDate = document.getElementById('infoStartDate')
    let infoEndDate = document.getElementById('infoEndDate')
    infoTitle.textContent = `行動主題：${obj?.title}`
    infoHost.textContent = `開團人：${obj?.hostName}`
    infoEmail.textContent = `開團人信箱：${obj?.email}`
    infoStartDate.textContent = `活動時間：${startDateObj.toLocaleString()}`
    infoEndDate.textContent = `至：${endDateObj.toLocaleString()}`
  }

  function showJoinForm() {
    if (!props.uid) {
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
    if (!props.uid) {
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
              //清除"我要開團"icon及InfoBox
              setNewMarker([])
              setSelected2(null)
              console.log(props.uid)
              if (props.uid) {
                //儲存這個點的經緯度到marker並show此事件的Data
                setSelected1(marker)
                ShowMarkerData(marker)
                //關開團教學框，開跟團教學框
                eventStep1.style.display = 'none'
                eventStep2.style.display = 'block'
                eventInfo.style.display = 'block'
              }
            }}
          />
        ))}
        {newMarker.map((marker) => (
          <Marker
            key={marker?.time?.toISOString()}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: '/location(gray).png',
              scaledSize: new window.google.maps.Size(50, 50),
            }}
            onClick={() => {
              setSelected2(marker)
              eventStep2.style.display = 'none'
              eventInfo.style.display = 'none'
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
          <InfoWindow
            position={{ lat: selected2.lat, lng: selected2.lng }}
            onCloseClick={() => {
              setSelected2(null)
              setNewMarker([])
            }}
          >
            <div>
              <h3 className={styles.openForm} onClick={showEventForm}>
                我要開團
              </h3>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      <JoinForm event={selected1} uid={props.uid} />
      <EventForm location={newMarker} uid={props.uid} />
    </div>
  )
}
