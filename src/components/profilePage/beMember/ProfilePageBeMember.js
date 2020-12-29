import React from 'react'
import PropTypes from 'prop-types'
import { BeMemberEvent } from './BeMemberEvent'
import styles from '../ProfilePage.module.scss'

export function ProfilePageBeMember(props) {
  ProfilePageBeMember.propTypes = {
    events: PropTypes.array,
    uid: PropTypes.string,
  }
  const events = props.events
  const beMemberEvents = events.map((event) => <BeMemberEvent key={event.eventId} uid={props.uid} event={event} />)

  return <div className={styles.eventContain}>{beMemberEvents}</div>
}
