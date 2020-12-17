import React from 'react'
import { ResultForm } from './ResultForm'
//scss
import styles from '../scss/ProfilePage.module.scss'

export function StatusAndBtn(props) {
  console.log(props)
  function showResultForm() {
    let closePopup = document.getElementById('resultForm')
    closePopup.style.display = 'block'
  }
  if (props.status === 'true') {
    return (
      <div>
        <p className={styles.eventStatus}>活動狀態：開放報名中</p>
      </div>
    )
  } else if (props.status === 'false' && props.eventData.hostId === props.uid) {
    return (
      <div>
        <p className={styles.eventStatus}>活動狀態：活動已舉辦，待成果上傳</p>
        <button className={styles.eventStatusBtn} id="uploadResultBtn" onClick={showResultForm}>
          點我上傳活動成果
        </button>
        <ResultForm uid={props.uid} eventId={props.eventData.eventId} />
      </div>
    )
  } else {
    return (
      <div>
        <p className={styles.eventStatus}>活動狀態：活動完成</p>
        <button className={styles.eventStatusBtn} id="showResultBtn">
          點我看活動成果
        </button>
      </div>
    )
  }
}
