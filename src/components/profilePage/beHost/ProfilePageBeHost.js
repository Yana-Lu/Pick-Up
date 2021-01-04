import React from 'react'
import PropTypes from 'prop-types'
import { BeHostEvent } from './BeHostEvent'
import styles from '../ProfilePage.module.scss'

export function ProfilePageBeHost(props) {
  const events = props.events
  const beHostEvents = events.map((event) => (
    <BeHostEvent
      key={event.eventId}
      uid={props.uid}
      event={event}
      beHostEvents={props.beHostEvents}
      setBeHostEvents={props.setBeHostEvents}
    />
  ))

  return <div className={styles.eventContain}>{beHostEvents}</div>
}

ProfilePageBeHost.propTypes = {
  events: PropTypes.array,
  uid: PropTypes.string,
  beHostEvents: PropTypes.array,
  setBeHostEvents: PropTypes.func,
}
