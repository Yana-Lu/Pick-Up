import React, { useEffect, useState } from 'react'
//firebase
import { showBeHostEvents } from './Firebase'
import { showBeMemberEvents } from './Firebase'
//beHost data
import { ProfilePageBeHost } from './ProfilePageBeHost'
//beMember data
import { ProfilePageBeMember } from './ProfilePageBeMember'
//scss
import styles from '../scss/ProfilePage.module.scss'
//button
import { Button, ButtonToolbar } from 'react-bootstrap'
//Fade
import Fade from 'react-reveal/Fade'
export function ProfilePage(props) {
  let uid = props.userData.uid
  //會員資料
  useEffect(() => {
    let avatarImg = document.getElementById('avatarImg')
    let userName = document.getElementById('userDisplayName')
    let userEmail = document.getElementById('userEmail')
    avatarImg.src = `${props?.userData?.photoURL}?type=large`
    userName.textContent = props.userData.displayName
    userEmail.textContent = props.userData.email
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])
  //會員開團資料及成員資料
  const [beHostEvents, setBeHostEvents] = useState([])
  const [beMemberEvents, setBeMemberEvents] = useState([])
  const [showBeHost, setShowBeHost] = useState(true)
  const [showBeMember, setShowBeMember] = useState(false)
  // console.log(props.userData.uid)
  let userBeHost = document.getElementById('userBeHost')
  let userBeMember = document.getElementById('userBeMember')
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
      console.dir(setBeHostEvents)
      showBeHostEvents(uid, setBeHostEvents)
    } catch (err) {
      console.log(err.message)
    }
  }, [uid])
  console.log(beHostEvents)

  useEffect(() => {
    try {
      showBeMemberEvents(uid, setBeMemberEvents)
    } catch (err) {
      console.log(err.message)
    }
  }, [uid])
  console.log(beMemberEvents)
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
