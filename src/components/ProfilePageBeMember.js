import React from 'react'
//beHost data
import { BeMemberEvent } from './BeMemberEvent'
//scss
import styles from '../scss/ProfilePage.module.scss'
export function ProfilePageBeMember(props) {
  // console.log(props)
  const events = props.events
  console.log(events)
  // let uid = props.uid

  const beMemberEvents = events.map((event) => <BeMemberEvent uid={props.uid} event={event} />)

  return <div className={styles.eventContain}>{beMemberEvents}</div>
}
