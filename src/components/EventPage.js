import React from 'react'
import styles from '../scss/EventPage.module.scss'
import { Maps } from './Maps'

export function EventPage(props) {
  // function showJoinForm() {
  //   let closePopup = document.querySelector('.joinForm')
  //   closePopup.style.display = 'block'
  // }
  console.log(props)
  return (
    <div className={styles.container}>
      <div className={styles.containerLeft}>
        <div className={styles.eventIcon}></div>
        <div className={styles.eventInfo}></div>
        {/* <button className={styles.joinEvent} onClick={showJoinForm}>
          我要跟團
        </button> */}
        {/* <JoinForm /> */}
      </div>
      <div className={styles.containerRight}>
        <h2>活動地點</h2>
        <div className={styles.mapContain}>
          <Maps />
        </div>
      </div>
    </div>
  )
}
