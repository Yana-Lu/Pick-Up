import React from 'react'
import PropTypes from 'prop-types'
import styles from './EventPage.module.scss'
import Fade from 'react-reveal/Fade'

export function EventNPC(props) {
  function clickBeHostBtn() {
    props.setBeMemberInfo(false)
    props.setShowbeMemberInfo(false)
    props.setBeHostInfo(true)
    props.setShowbeHostInfo(true)
  }
  function clickBeMemberBtn() {
    props.setBeHostInfo(false)
    props.setShowbeHostInfo(false)
    props.setBeMemberInfo(true)
    props.setShowbeMemberInfo(true)
  }

  return (
    <div className={styles.eventHostBG}>
      <Fade top>
        <div
          className={`${styles.eventHost}  ${props.beHostInfo ? styles.lightUp : ''}`}
          id="ifBeHost"
          onClick={clickBeHostBtn}
        >
          <br />
          <div className={styles.ifBeHost}>
            <div className={styles.ifBeHostImg}></div>
            <h3 className={styles.ifBeHostText}>想要開團</h3>
          </div>
          <br />
        </div>
      </Fade>
      <Fade top>
        <div
          className={`${styles.eventJoin}  ${props.beMemberInfo ? styles.lightUp : ''}`}
          id="ifBeMember"
          onClick={clickBeMemberBtn}
        >
          <br />
          <div className={styles.ifBeMember}>
            <div className={styles.ifBeMemberImg}></div>
            <h3 className={styles.ifBeMemberText}>想要跟團</h3>
          </div>
          <br />
        </div>
      </Fade>
      <Fade>
        <div className={`${styles.eventStep1}  ${props.showbeHostInfo ? styles.showUp : ''}`} id="eventStep1">
          <h3>在地圖上點擊地點設立座標</h3>
          <br />
          <h3>點擊該座標</h3>
          <br />
          <h3>點擊我要開團</h3>
          <br />
          <h3>填好完整資料並點擊開團按鈕</h3>
        </div>
      </Fade>

      <Fade>
        <div className={`${styles.eventStep2}  ${props.showbeMemberInfo ? styles.showUp : ''}`} id="eventStep2">
          <h3>點擊地圖上想跟團的座標</h3>
          <br />
          <h3>點擊我想跟團</h3>
          <br />
          <h3>填妥資料並點擊跟團按鈕</h3>

          <div className={styles.eventInfo}>
            <p id="infoTitle">行動主題： {props.infoTitle}</p>
            <p id="infoHost">開團人： {props.infoHost}</p>
            <p id="infoEmail">開團人信箱： {props.infoEmail}</p>
            <p id="infoStartDate">活動日期： {props.infoStartDate}</p>
            <p id="infoTime">活動時間： {props.infoTime}</p>
            <p id="memberLimit">人數上限： {props.memberLimit} </p>
            <p id="memberNum">目前人數： {props.memberNum}</p>
          </div>
        </div>
      </Fade>
    </div>
  )
}

EventNPC.propTypes = {
  uid: PropTypes.string,
  beHostInfo: PropTypes.bool,
  setBeHostInfo: PropTypes.func,
  beMemberInfo: PropTypes.bool,
  setBeMemberInfo: PropTypes.func,
  showbeHostInfo: PropTypes.bool,
  setShowbeHostInfo: PropTypes.func,
  showbeMemberInfo: PropTypes.bool,
  setShowbeMemberInfo: PropTypes.func,
  infoTitle: PropTypes.string,
  infoHost: PropTypes.string,
  infoEmail: PropTypes.string,
  infoStartDate: PropTypes.string,
  infoTime: PropTypes.string,
  memberLimit: PropTypes.string,
  memberNum: PropTypes.string,
}
