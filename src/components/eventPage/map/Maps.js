import React, { useEffect, useState, useCallback } from 'react'
import { showEvent } from '../../Firebase'
import styles from './Map.module.scss'
import MapStyles from './MapStyles'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api'
import Swal from 'sweetalert2'
import { JoinForm } from '../form/JoinForm'
import { EventForm } from '../form/EventForm'
import { Button } from 'react-bootstrap'

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
  const eventStep1 = document.getElementById('eventStep1')
  const eventStep2 = document.getElementById('eventStep2')
  const eventInfo = document.getElementById('eventInfo')
  const ifBeHost = document.getElementById('ifBeHost')
  const ifBeMember = document.getElementById('ifBeMember')
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `AIzaSyAhDv35adlrxazUwPtZvjU7NE3RAaq3piQ`,
    libraries,
  })
  const [events, setEvents] = useState([])

  useEffect(() => {
    function saveEventsInMap(data) {
      setEvents(data)
    }
    showEvent(saveEventsInMap)
  }, [])
  // const [markers, setMarkers] = useState([])
  const [newMarker, setNewMarker] = useState([])
  const allMarkers = []
  events.forEach((event) => {
    allMarkers.push({
      eventId: event.eventId,
      title: event.title,
      hostId: event.hostId,
      hostName: event.hostName,
      email: event.email,
      phone: event.phone,
      startTime: event.startTime,
      endTime: event.endTime,
      memberLimit: event.memberLimit,
      members: event.members,
      memberId: event.memberId,
      lat: event.lat,
      lng: event.lng,
      time: event.startTime,
      status: event.status,
    })
  })

  const onMapClick = useCallback(
    (event) => {
      if (props.uid) {
        setNewMarker(() => [
          {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date().getTime(),
          },
        ])
        eventStep1.style.display = 'block'
        eventStep2.style.display = 'none'
        eventInfo.style.display = 'none'
        ifBeHost.style.backgroundColor = '#add8e6'
        ifBeMember.style.backgroundColor = ''
        //清除"我要跟團"InfoBox
        setSelectedEvent(null)
        //清除"我要開團"InfoBox
        setSelectedNewSite(null)
      } else {
        setNewMarker([])
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.uid]
  )
  //點擊icon時存該點data
  //跟團
  const [selectedEvent, setSelectedEvent] = useState(null)
  //開團
  const [selectedNewSite, setSelectedNewSite] = useState(null)

  if (loadError) return 'Error loading maps'
  if (!isLoaded) return 'Loading Maps'
  //Show the data of marker

  function ShowMarkerData(obj) {
    console.log(obj)
    //抓日期
    const startTimeObj = new Date(obj?.startTime)
    const endTimeObj = new Date(obj?.endTime)
    const weekdays = '星期日,星期一,星期二,星期三,星期四,星期五,星期六'.split(',')
    // 抓時間
    const startTimePart = startTimeObj.toTimeString().split(':')
    const endTimePart = endTimeObj.toTimeString().split(':')

    const infoTitle = document.getElementById('infoTitle')
    const infoHost = document.getElementById('infoHost')
    const infoEmail = document.getElementById('infoEmail')
    const infoStartDate = document.getElementById('infoStartDate')
    const infoTime = document.getElementById('infoTime')
    const memberLimit = document.getElementById('memberLimit')
    const memberNum = document.getElementById('memberNum')
    infoTitle.textContent = `行動主題：${obj?.title}`
    infoHost.textContent = `開團人：${obj?.hostName}`
    infoEmail.textContent = `開團人信箱：${obj?.email}`
    infoStartDate.textContent = `活動日期：${startTimeObj.getFullYear()}/${
      startTimeObj.getMonth() + 1
    }/${startTimeObj.getDate()} ${weekdays[startTimeObj.getDay()]}`
    infoTime.textContent = `活動時間：${startTimePart[0]}：${startTimePart[1]}~${endTimePart[0]}：${endTimePart[1]}`
    memberLimit.textContent = `人數上限：${obj?.memberLimit} 人`
    memberNum.textContent = `目前人數：${obj?.members.length} 人`
    if (obj?.members.length < obj?.memberLimit) {
      memberNum.textContent = `目前人數：${obj?.members.length} 人 `
    } else {
      memberNum.textContent = `目前人數：${obj?.members.length} 人 (報名已額滿)`
    }
  }

  function showJoinForm() {
    // console.log(props.uid)
    // console.log(selectedEvent)
    // console.log(selectedEvent.memberId)
    const memberIdArray = selectedEvent.memberId
    const memberIdArray1 = memberIdArray.filter(function (x) {
      return x === props.uid
    })
    console.log(memberIdArray1)
    if (memberIdArray1.length === 1) {
      Swal.fire('不可以重複跟團喔！', '除非你會影分身之術', 'warning')
    } else if (props.uid === selectedEvent.hostId) {
      Swal.fire('這是你本人開的團喔！', '', 'warning')
    } else {
      const closePopup = document.getElementById('joinForm')
      closePopup.style.display = 'block'
    }
  }
  function showEventForm() {
    console.log(props.uid)
    if (!props.uid) {
      Swal.fire({
        icon: 'warning',
        title: '請先登入喔!',
      })
    } else {
      const closePopup = document.getElementById('eventForm')
      closePopup.style.display = 'block'
    }
  }
  console.log(allMarkers)
  console.log(newMarker)
  //是否招募已滿判斷
  function Recruitment(obj) {
    console.log(obj)
    // console.log(obj.marker.members)
    // console.log(obj.marker.members?.length)
    // console.log(obj.marker.memberLimit)
    if (obj.marker.members?.length < obj.marker.memberLimit) {
      return (
        <InfoWindow
          position={{ lat: selectedEvent?.lat, lng: selectedEvent?.lng }}
          onCloseClick={() => setSelectedEvent(null)}
        >
          <div>
            <Button className={styles.openForm} variant="outline-danger" onClick={showJoinForm}>
              我要跟團
            </Button>
          </div>
        </InfoWindow>
      )
    } else {
      return (
        <InfoWindow
          position={{ lat: selectedEvent?.lat, lng: selectedEvent?.lng }}
          onCloseClick={() => setSelectedEvent(null)}
        >
          <div>
            <p style={{ fontSize: '1rem', margin: '0' }}>報名人數已額滿</p>
          </div>
        </InfoWindow>
      )
    }
  }

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
            key={marker?.time}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              //清除"我要開團"icon及InfoBox
              setNewMarker([])
              setSelectedNewSite(null)
              console.log(props.uid)
              console.log(marker)
              if (props.uid) {
                //儲存這個點的經緯度到marker並show此事件的Data
                setSelectedEvent(marker)
                ShowMarkerData(marker)
                //關開團教學框，開跟團教學框
                eventStep1.style.display = 'none'
                eventStep2.style.display = 'block'
                eventInfo.style.display = 'block'
                ifBeMember.style.backgroundColor = '#add8e6'
                ifBeHost.style.backgroundColor = ''
              }
              // Recruitment(marker)
            }}
          />
        ))}
        {newMarker.map((marker) => (
          <Marker
            key={marker?.time}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: '/location(gray).png',
              scaledSize: new window.google.maps.Size(50, 50),
            }}
            onClick={() => {
              setSelectedNewSite(marker)
              eventStep1.style.display = 'block'
              eventStep2.style.display = 'none'
              eventInfo.style.display = 'none'
            }}
          />
        ))}
        {selectedEvent ? <Recruitment marker={selectedEvent} /> : null}

        {selectedNewSite ? (
          <InfoWindow
            position={{ lat: selectedNewSite.lat, lng: selectedNewSite.lng }}
            onCloseClick={() => {
              setSelectedNewSite(null)
              setNewMarker([])
            }}
          >
            <div>
              <Button className={styles.openForm} variant="outline-secondary" onClick={showEventForm}>
                我要開團
              </Button>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      <JoinForm
        event={selectedEvent}
        uid={props.uid}
        events={events}
        setEvents={setEvents}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        ShowMarkerData={ShowMarkerData}
      />
      <EventForm
        location={newMarker}
        uid={props.uid}
        events={events}
        setEvents={setEvents}
        newMarker={newMarker}
        setNewMarker={setNewMarker}
        selectedNewSite={selectedNewSite}
        setSelectedNewSite={setSelectedNewSite}
      />
    </div>
  )
}
