import React, { useState, useEffect } from 'react'
import { ResultForm } from './ResultForm'
import { Result } from './Result'
import { showResults } from './Firebase'
//scss
import styles from '../scss/ProfilePage.module.scss'
import { Button } from 'react-bootstrap'
export function StatusAndBtn(props) {
  console.log(props)
  const [allResults, setAllResults] = useState([])
  const [showResultForm, setShowResultForm] = useState(false)
  const [showResult, setShowResult] = useState(false)
  // const events = props.beHostEvents
  useEffect(() => {
    try {
      function saveResultsInProfile(result) {
        setAllResults(result)
      }
      showResults(saveResultsInProfile)
      console.log(allResults)
    } catch (err) {
      console.log(err.message)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.uid])
  const handleShowResultForm = () => {
    setShowResultForm(false)
  }
  const handleshowresult = () => {
    setShowResult(false)
  }
  // function showResultForm() {
  //   let closePopup = document.getElementById('resultForm')
  //   closePopup.style.display = 'block'
  // }
  if (props.status === 'true' && props.eventData.member_limit > props.eventData.members.length) {
    return (
      <div>
        <p className={styles.eventStatus}>行動狀態：開放報名中</p>
      </div>
    )
  } else if (props.status === 'true' && props.eventData.member_limit <= props.eventData.members.length) {
    return (
      <div>
        <p className={styles.eventStatus}>行動狀態：行動未執行，報名人數已額滿</p>
      </div>
    )
  } else if (props.status === 'false' && props.uid === props.eventData.hostId) {
    return (
      <div>
        <p className={styles.eventStatus}>行動狀態：行動已執行，待成果上傳</p>
        <div className={styles.eventStatusBtns}>
          <Button
            variant="outline-primary"
            className={styles.eventStatusBtn}
            id="uploadResultBtn"
            onClick={() => {
              setShowResultForm(true)
            }}
          >
            上傳行動成果
          </Button>
          <ResultForm
            uid={props.uid}
            eventId={props.eventData.eventId}
            showResultForm={showResultForm}
            handleShowResultForm={handleShowResultForm}
            beHostEvents={props.beHostEvents}
            setBeHostEvents={props.setBeHostEvents}
          />
        </div>
      </div>
    )
  } else if (props.status === 'false') {
    return (
      <div>
        <p className={styles.eventStatus}>行動狀態：行動已執行，待主辦人上傳成果</p>
      </div>
    )
  } else {
    return (
      <div>
        <p className={styles.eventStatus}>行動狀態：已完成</p>
        <div className={styles.eventStatusBtns}>
          <Button
            variant="outline-success"
            className={styles.eventStatusBtn}
            id="showResultBtn"
            onClick={() => {
              setShowResult(true)
            }}
          >
            看行動成果
          </Button>
        </div>
        {/* {result} */}
        <Result
          uid={props.uid}
          eventId={props.eventData.eventId}
          eventData={props.eventData}
          showResult={showResult}
          handleshowresult={handleshowresult}
        />
      </div>
    )
  }
}
