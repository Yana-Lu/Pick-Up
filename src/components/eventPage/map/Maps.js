import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { getEvents } from '../../Firebase'
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
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: `AIzaSyAhDv35adlrxazUwPtZvjU7NE3RAaq3piQ`,
    libraries,
  })
  const [events, setEvents] = useState([])
  const [showUpEventForm, setShowUpEventForm] = useState(false)
  const [showUpJoinForm, setShowUpJoinForm] = useState(false)

  useEffect(() => {
    function saveEventsInMap(data) {
      setEvents(data)
    }
    getEvents(saveEventsInMap)
  }, [])

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
        props.setBeMemberInfo(false)
        props.setShowbeMemberInfo(false)
        props.setBeHostInfo(true)
        props.setShowbeHostInfo(true)
        //清除"我要跟團"InfoBox
        setSelectedEvent(null)
        //清除"我要開團"InfoBox
        setSelectedNewSite(null)
      } else {
        setNewMarker([])
      }
    },
    [props.uid]
  )
  //點擊icon時存該點data
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedNewSite, setSelectedNewSite] = useState(null)

  if (loadError) return 'Error loading maps'
  if (!isLoaded) return 'Loading Maps'

  function ShowMarkerData(obj) {
    const startTimeObj = new Date(obj?.startTime)
    const endTimeObj = new Date(obj?.endTime)
    const weekdays = '星期日,星期一,星期二,星期三,星期四,星期五,星期六'.split(',')
    const startTimePart = startTimeObj.toTimeString().split(':')
    const endTimePart = endTimeObj.toTimeString().split(':')

    props.setInfoTitle(obj.title)
    props.setInfoHost(obj.hostName)
    props.setInfoEmail(obj.email)
    props.setInfoStartDate(
      `${startTimeObj.getFullYear()}/${startTimeObj.getMonth() + 1}/${startTimeObj.getDate()} ${
        weekdays[startTimeObj.getDay()]
      }`
    )
    props.setInfoTime(`${startTimePart[0]}：${startTimePart[1]}~${endTimePart[0]}：${endTimePart[1]}`)
    props.setMemberLimit(`${obj.memberLimit} 人`)
    if (obj.members.length < obj.memberLimit) {
      props.setMemberNum(`${obj.members.length} `)
    } else {
      props.setMemberNum('報名人數已額滿')
    }
  }

  function showEventForm() {
    if (!props.uid) {
      Swal.fire({
        icon: 'warning',
        title: '請先登入喔!',
      })
    } else {
      setShowUpEventForm(true)
    }
  }

  function showJoinForm() {
    const memberIdArray = selectedEvent.memberId
    const memberIdArray1 = memberIdArray.filter(function (uid) {
      return uid === props.uid
    })
    if (memberIdArray1.length === 1) {
      Swal.fire('不可以重複跟團喔！', '除非你會影分身之術', 'warning')
    } else if (props.uid === selectedEvent.hostId) {
      Swal.fire('這是你本人開的團喔！', '', 'warning')
    } else {
      setShowUpJoinForm(true)
    }
  }

  function Recruitment(obj) {
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
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center} options={options} onClick={onMapClick}>
        {allMarkers.map((marker) => (
          <Marker
            key={marker?.time}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              //清除"我要開團"InfoBox及icon
              setNewMarker([])
              setSelectedNewSite(null)
              if (props.uid) {
                //儲存這個點的經緯度到marker並show此事件的Data
                setSelectedEvent(marker)
                ShowMarkerData(marker)
                //關開團教學框，開跟團教學框
                props.setBeHostInfo(false)
                props.setShowbeHostInfo(false)
                props.setBeMemberInfo(true)
                props.setShowbeMemberInfo(true)
              }
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
        showUpJoinForm={showUpJoinForm}
        setShowUpJoinForm={setShowUpJoinForm}
        event={selectedEvent}
        uid={props.uid}
        events={events}
        setEvents={setEvents}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
        ShowMarkerData={ShowMarkerData}
      />
      <EventForm
        showUpEventForm={showUpEventForm}
        setShowUpEventForm={setShowUpEventForm}
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

Maps.propTypes = {
  uid: PropTypes.string,
  beHostInfo: PropTypes.bool,
  setBeHostInfo: PropTypes.func,
  beMemberInfo: PropTypes.bool,
  setBeMemberInfo: PropTypes.func,
  showbeHostInfo: PropTypes.bool,
  setShowbeHostInfo: PropTypes.func,
  showbeMemberInfo: PropTypes.bool,
  setShowbeMemberInfo: PropTypes.func,
  infoTitle: PropTypes.string,
  setInfoTitle: PropTypes.func,
  infoHost: PropTypes.string,
  setInfoHost: PropTypes.func,
  infoEmail: PropTypes.string,
  setInfoEmail: PropTypes.func,
  infoStartDate: PropTypes.string,
  setInfoStartDate: PropTypes.func,
  infoTime: PropTypes.string,
  setInfoTime: PropTypes.func,
  memberLimit: PropTypes.string,
  setMemberLimit: PropTypes.func,
  memberNum: PropTypes.string,
  setMemberNum: PropTypes.func,
}
