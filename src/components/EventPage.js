import React from 'react'
import styles from '../scss/EventPage.module.scss'
import { Maps } from './Maps'

export function EventPage(props) {
  console.log(props)
  return (
    <div className={styles.container}>
      <div className={styles.containerLeft}>
        <div className={styles.eventHost}>
          <br />
          <h3>如果你想開團</h3>
          <br />
          <div className={styles.eventStep1}>
            <h3>1.在地圖上點擊地點設立座標</h3>
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
            <h3>2.點擊"我想跟團"</h3>
            <h3>3.填好完整資料並點擊跟團按鈕</h3>
            <p>開團中的行動資訊如下:</p>
          </div>
          <div className={styles.eventInfo}>
            <p id="infoTitle">行動主題:</p>
            <p id="infoHost">開團人:</p>
            <p id="infoEmail">開團人信箱:</p>
            <p id="infoStartDate">活動時間:</p>
            <p id="infoEndDate">至</p>
            {/* <p id="infoMemgerLimit">人數上限:</p>
            <p id="infoRest">剩餘名額:</p> */}
          </div>
        </div>
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
export function ShowMarkerData(obj) {
  console.log(obj)
  let startDateObj = new Date(obj?.startDate)
  let endDateObj = new Date(obj?.endDate)
  console.log(obj?.startDate)
  console.log(startDateObj)
  let infoTitle = document.getElementById('infoTitle')
  let infoHost = document.getElementById('infoHost')
  let infoEmail = document.getElementById('infoEmail')
  let infoStartDate = document.getElementById('infoStartDate')
  let infoEndDate = document.getElementById('infoEndDate')
  infoTitle.textContent = `行動主題：${obj?.title}`
  infoHost.textContent = `開團人：${obj?.hostName}`
  infoEmail.textContent = `開團人信箱：${obj?.email}`
  infoStartDate.textContent = `活動時間：${startDateObj.toLocaleString()}`
  infoEndDate.textContent = `至：${endDateObj.toLocaleString()}`
}
