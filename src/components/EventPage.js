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
        <div className={styles.eventHost}>
          <br />
          <h3>如果你想開團</h3>
          <br />
          <div className={styles.eventStep1}>
            <h3>1.點擊地圖上想開團的地點設立座標</h3>
            <h3>2.點擊該座標</h3>
            <h3>3.點擊"我要開團"</h3>
            <h3>4.填好完整資料並點擊開團按鈕</h3>
          </div>
        </div>
        <div className={styles.eventJoin}>
          <br />
          <h3>如果你想跟團</h3>
          <br />
          <div className={styles.eventStep2}>
            <h3>1.點擊地圖上想跟團的座標</h3>
            <h3>2.點擊"我跟開團"</h3>
            <h3>3.填好完整資料並點擊跟團按鈕</h3>
          </div>
          <div className={styles.eventInfo}>
            <p>行動主題:</p>
            <p>開團人:</p>
            <p>開團人信箱:</p>
            <p>活動日期:</p>
            <p>活動時間:</p>
          </div>
        </div>
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
