import React from 'react'
import { BeHostEvent } from './BeHostEvent'
import styles from '../ProfilePage.module.scss'
export function ProfilePageBeHost(props) {
  const events = props.events
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
