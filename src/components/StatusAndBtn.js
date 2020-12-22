import React from 'react'
import { ResultForm } from './ResultForm'
import { Result } from './Result'
//scss
import styles from '../scss/ProfilePage.module.scss'
import { Button } from 'react-bootstrap'
export function StatusAndBtn(props) {
  console.log(props)
  // const [showResult, setShowResult] = useState(false)
  function showResultPopUp() {
    let resultPopup = document.getElementById('result')
    resultPopup.style.display = 'block'
  }
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
        <div className={styles.eventStatusBtns}>
          <Button
            variant="outline-primary"
            className={styles.eventStatusBtn}
            id="uploadResultBtn"
            onClick={showResultForm}
          >
            上傳活動成果
          </Button>
          <ResultForm uid={props.uid} eventId={props.eventData.eventId} />
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <p className={styles.eventStatus}>活動狀態：活動完成</p>
        <div className={styles.eventStatusBtns}>
          <Button
            variant="outline-success"
            className={styles.eventStatusBtn}
            id="showResultBtn"
            onClick={showResultPopUp}
          >
            看活動成果
          </Button>
          <Result uid={props.uid} eventId={props.eventData.eventId} />
        </div>
      </div>
    )
  }
}
