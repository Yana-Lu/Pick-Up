import React from 'react'
import { BeMemberEvent } from './BeMemberEvent'
import styles from '../ProfilePage.module.scss'

export function ProfilePageBeMember(props) {
  const events = props.events
  const beMemberEvents = events.map((event) => <BeMemberEvent uid={props.uid} event={event} />)

  return <div className={styles.eventContain}>{beMemberEvents}</div>
}
