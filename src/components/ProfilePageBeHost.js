import React from 'react'
//beHost data
import { BeHostEvent } from './BeHostEvent'
//scss
import styles from '../scss/ProfilePage.module.scss'
export function ProfilePageBeHost(props) {
  console.log(props)
  const events = props.events
  // console.log(events)
  // let uid = props.uid

  const beHostEvents = events.map((event) => (
    <BeHostEvent
      uid={props.uid}
      event={event}
      beHostEvents={props.beHostEvents}
      setBeHostEvents={props.setBeHostEvents}
    />
  ))

  return <div className={styles.eventContain}>{beHostEvents}</div>
}
