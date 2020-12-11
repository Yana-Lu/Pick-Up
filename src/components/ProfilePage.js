import React, { useEffect, useState } from 'react'
//firebase
import { showBeHostEvents } from './Firebase'
import { showMember } from './Firebase'
//scss
import styles from '../scss/ProfilePage.module.scss'
//button
import { Button, ButtonToolbar, Col } from 'react-bootstrap'
export function ProfilePage(props) {
  // console.log(props)
  // console.log(props.userData.displayName)
  //會員資料
  useEffect(() => {
    let avatarImg = document.getElementById('avatarImg')
    let userName = document.getElementById('userDisplayName')
    let userEmail = document.getElementById('userEmail')
    avatarImg.src = `${props?.userData?.photoURL}?type=large`
    userName.textContent = props.userData.displayName
    userEmail.textContent = props.userData.email
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  //會員開團資料及成員資料
  const [beHostEvents, setBeHostEvents] = useState([])
  const [eventMembers, seteventMembers] = useState([])

  let uid = props.userData.uid
  useEffect(() => {
    showBeHostEvents(uid, setBeHostEvents)
  }, [])
  console.log(beHostEvents)

  // useEffect(() => {
  //   showMember(uid, seteventMembers)
  // }, [])
  // console.log(eventMembers)

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
            // onClick={showbeHost}
          >
            我的開團
          </Button>
          <Button
            className={styles.button}
            variant="default"
            id="userBeHost"
            // onClick={showbeHost}
          >
            我的跟團
          </Button>
        </ButtonToolbar>
        <div className={styles.events}>
          <div className={styles.event}></div>
        </div>
      </div>
    </div>
  )
}
