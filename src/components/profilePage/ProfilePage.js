import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { showBeHostEvents } from '../Firebase'
import { showBeMemberEvents } from '../Firebase'
import { ProfilePageBeHost } from './beHost/ProfilePageBeHost'
import { ProfilePageBeMember } from './beMember/ProfilePageBeMember'
import styles from './ProfilePage.module.scss'
import { Button, ButtonToolbar } from 'react-bootstrap'
import Fade from 'react-reveal/Fade'

export function ProfilePage(props) {
  ProfilePage.propTypes = {
    userData: PropTypes.object,
  }
  const uid = props.userData.uid

  useEffect(() => {
    const avatarImg = document.getElementById('avatarImg')
    const userName = document.getElementById('userDisplayName')
    const userEmail = document.getElementById('userEmail')
    avatarImg.src = `${props?.userData?.photoURL}?type=large`
    userName.textContent = props.userData.displayName
    userEmail.textContent = props.userData.email
  }, [uid])

  const [beHostEvents, setBeHostEvents] = useState([])
  const [beMemberEvents, setBeMemberEvents] = useState([])
  const [showBeHost, setShowBeHost] = useState(false)
  const [showBeMember, setShowBeMember] = useState(false)

  const userBeHost = document.getElementById('userBeHost')
  const userBeMember = document.getElementById('userBeMember')
  userBeHost?.addEventListener('click', () => {
    userBeHost.style.backgroundColor = '#add8e6'
  })
  userBeMember?.addEventListener('click', () => {
    userBeHost.style.backgroundColor = ''
  })
  userBeMember?.addEventListener('click', () => {
    userBeMember.style.backgroundColor = '#add8e6'
  })
  userBeHost?.addEventListener('click', () => {
    userBeMember.style.backgroundColor = ''
  })
  useEffect(() => {
    try {
      showBeHostEvents(uid, setBeHostEvents)
    } catch (err) {
      console.log(err.message)
    }
  }, [uid])

  useEffect(() => {
    try {
      showBeMemberEvents(uid, setBeMemberEvents)
    } catch (err) {
      console.log(err.message)
    }
  }, [uid])

  return (
    <div className={styles.MainContain}>
      <div className={styles.ProfileContain}>
        <div className={styles.ProfileData}>
          <div className={styles.avatar}>
            <img alt="avatar" className={styles.avatarImg} id="avatarImg"></img>
          </div>
          <div className={styles.userDisplayName} id="userDisplayName"></div>
          <div className={styles.userEmail} id="userEmail"></div>
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
