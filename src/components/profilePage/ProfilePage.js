import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { getBeHostEvents } from '../Firebase'
import { getBeMemberEvents } from '../Firebase'
import { ProfilePageBeHost } from './beHost/ProfilePageBeHost'
import { ProfilePageBeMember } from './beMember/ProfilePageBeMember'
import styles from './ProfilePage.module.scss'
import { Button, ButtonToolbar } from 'react-bootstrap'
import Fade from 'react-reveal/Fade'

export function ProfilePage(props) {
  const avatarImgRef = useRef(null)
  const userNameRef = useRef(null)
  const userEmailRef = useRef(null)
  const [beHostEvents, setBeHostEvents] = useState([])
  const [beMemberEvents, setBeMemberEvents] = useState([])
  const [showBeHost, setShowBeHost] = useState(false)
  const [showBeMember, setShowBeMember] = useState(false)
  const uid = props.userData.uid

  ProfilePage.propTypes = {
    userData: PropTypes.object,
  }

  useEffect(() => {
    avatarImgRef.current.src = `${props?.userData?.photoURL}?type=large`
    userNameRef.current.textContent = props.userData.displayName
    userEmailRef.current.textContent = props.userData.email

    try {
      getBeHostEvents(uid, setBeHostEvents)
    } catch (err) {
      console.log(err.message)
    }

    try {
      getBeMemberEvents(uid, setBeMemberEvents)
    } catch (err) {
      console.log(err.message)
    }
  }, [uid])

  return (
    <div className={styles.MainContain}>
      <div className={styles.ProfileContain}>
        <div className={styles.ProfileData}>
          <div className={styles.avatar}>
            <img alt="avatar" className={styles.avatarImg} ref={avatarImgRef}></img>
          </div>
          <div className={styles.userDisplayName} ref={userNameRef}></div>
          <div className={styles.userEmail} ref={userEmailRef}></div>
        </div>
      </div>
      <div className={styles.eventsContain}>
        <ButtonToolbar className={styles.buttons}>
          <Button
            className={styles.button}
            variant="default"
            id="userBeHost"
            onClick={() => {
              setShowBeHost(true)
              setShowBeMember(false)
            }}
          >
            我的開團
          </Button>
          <Button
            className={styles.button}
            variant="default"
            id="userBeMember"
            onClick={() => {
              setShowBeHost(false)
              setShowBeMember(true)
            }}
          >
            我的跟團
          </Button>
        </ButtonToolbar>
        <Fade>
          <div className={`${styles.events} ${showBeHost ? styles.showUp : ''}`} id="events">
            <ProfilePageBeHost
              uid={props.userData.uid}
              events={beHostEvents}
              beHostEvents={beHostEvents}
              setBeHostEvents={setBeHostEvents}
            />
          </div>
          <div className={`${styles.events} ${showBeMember ? styles.showUp : ''}`} id="followEvents">
            <ProfilePageBeMember uid={props.userData.uid} events={beMemberEvents} />
          </div>
        </Fade>
      </div>
    </div>
  )
}
