import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './EventPage.module.scss'
import { EventNPC } from './EventNPC'
import { Maps } from './map/Maps'
import Fade from 'react-reveal/Fade'
import Swal from 'sweetalert2'

export function EventPage(props) {
  const [beHostInfo, setBeHostInfo] = useState(false)
  const [beMemberInfo, setBeMemberInfo] = useState(false)
  const [showbeHostInfo, setShowbeHostInfo] = useState(false)
  const [showbeMemberInfo, setShowbeMemberInfo] = useState(false)

  const [infoTitle, setInfoTitle] = useState('')
  const [infoHost, setInfoHost] = useState('')
  const [infoEmail, setInfoEmail] = useState('')
  const [infoStartDate, setInfoStartDate] = useState('')
  const [infoTime, setInfoTime] = useState('')
  const [memberLimit, setMemberLimit] = useState('')
  const [memberNum, setMemberNum] = useState('')

  function checkUid() {
    if (!props.uid) {
      Swal.fire({
        icon: 'warning',
        title: '請先登入喔!',
      })
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerLeft}>
        <EventNPC
          uid={props.uid}
          beHostInfo={beHostInfo}
          setBeHostInfo={setBeHostInfo}
          beMemberInfo={beMemberInfo}
          setBeMemberInfo={setBeMemberInfo}
          showbeHostInfo={showbeHostInfo}
          setShowbeHostInfo={setShowbeHostInfo}
          showbeMemberInfo={showbeMemberInfo}
          setShowbeMemberInfo={setShowbeMemberInfo}
          infoTitle={infoTitle}
          setInfoTitle={setInfoTitle}
          infoHost={infoHost}
          setInfoHost={setInfoHost}
          infoEmail={infoEmail}
          setInfoEmail={setInfoEmail}
          infoStartDate={infoStartDate}
          setInfoStartDate={setInfoStartDate}
          infoTime={infoTime}
          setInfoTime={setInfoTime}
          memberLimit={memberLimit}
          setMemberLimit={setMemberLimit}
          memberNum={memberNum}
          setMemberNum={setMemberNum}
        />
      </div>
      <div className={styles.containerRight}>
        <Fade top>
          <h2>活動地點</h2>
          <div className={styles.mapContain} id="mapContain" onClick={checkUid}>
            <Maps
              uid={props.uid}
              beHostInfo={beHostInfo}
              setBeHostInfo={setBeHostInfo}
              beMemberInfo={beMemberInfo}
              setBeMemberInfo={setBeMemberInfo}
              showbeHostInfo={showbeHostInfo}
              setShowbeHostInfo={setShowbeHostInfo}
              showbeMemberInfo={showbeMemberInfo}
              setShowbeMemberInfo={setShowbeMemberInfo}
              infoTitle={infoTitle}
              setInfoTitle={setInfoTitle}
              infoHost={infoHost}
              setInfoHost={setInfoHost}
              infoEmail={infoEmail}
              setInfoEmail={setInfoEmail}
              infoStartDate={infoStartDate}
              setInfoStartDate={setInfoStartDate}
              infoTime={infoTime}
              setInfoTime={setInfoTime}
              memberLimit={memberLimit}
              setMemberLimit={setMemberLimit}
              memberNum={memberNum}
              setMemberNum={setMemberNum}
            />
          </div>
        </Fade>
      </div>
    </div>
  )
}

EventPage.propTypes = {
  uid: PropTypes.string,
}
