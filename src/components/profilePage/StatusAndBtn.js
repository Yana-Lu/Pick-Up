import React, { useState, useEffect } from 'react'
import { showResults } from '../Firebase'
import { ResultForm } from './beHost/ResultForm'
import { Result } from './Result'
import styles from './ProfilePage.module.scss'
import { Button } from 'react-bootstrap'

export function StatusAndBtn(props) {
  const [allResults, setAllResults] = useState([])
  const [showResultForm, setShowResultForm] = useState(false)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    showResults(setAllResults)
  }, [])
  const handleShowResultForm = () => {
    setShowResultForm(false)
  }
  const handleshowresult = () => {
    setShowResult(false)
  }

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
        <Result
          uid={props.uid}
          allResults={allResults}
          eventId={props.eventData.eventId}
          eventData={props.eventData}
          showResult={showResult}
          handleshowresult={handleshowresult}
        />
      </div>
    )
  }
}
