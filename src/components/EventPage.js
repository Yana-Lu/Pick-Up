import React from 'react'
import styles from '../scss/EventPage.module.scss'
import { EventForm } from './EventForm'
import { JoinForm } from './JoinForm'
import { Maps } from './Maps'

export function EventPage() {
  function showEventForm() {
    let closePopup = document.querySelector('.eventForm')
    closePopup.style.display = 'block'
  }

  function showJoinForm() {
    let closePopup = document.querySelector('.joinForm')
    closePopup.style.display = 'block'
  }
  return (
    <div className={styles.container}>
      <div className={styles.containerLeft}>
        <button className={styles.setEvent} onClick={showEventForm}>
          我要開團
        </button>
        <button className={styles.joinEvent} onClick={showJoinForm}>
          我要跟團
        </button>
        <EventForm />
        <JoinForm />
      </div>
      <div className={styles.containerRight}>
        <div className="map">
          <h2>活動地點</h2>
          <Maps />
        </div>
      </div>
    </div>
  )
}
