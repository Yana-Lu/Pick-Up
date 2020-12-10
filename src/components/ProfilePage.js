import React, { useEffect, useState } from 'react'
//firebase
import { showBeHost } from './Firebase'
import { showBeHostEvent } from './Firebase'
//scss
import styles from '../scss/ProfilePage.module.scss'
//button
import { Button, Col } from 'react-bootstrap'
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
  //會員開團跟團資料
  const [beHost, setBeHost] = useState([])
  const [beHostEvents, setBeHostEvents] = useState([])

  let uid = props.userData.uid
  useEffect(() => {
    showBeHost(uid, setBeHost)
  }, [])
  console.log(beHost)

  useEffect(() => {
    for (let i = 0; i < beHost.length; i++) {
      showBeHostEvent(beHost[i].eventId, setBeHostEvents, beHostEvents)
      console.log('beHost迴圈')
    }
    console.log(beHostEvents)
  }, [beHost])
  console.log(beHostEvents)

  return (
    <div className={styles.ProfileContain}>
      <div className={styles.ProfileData}>
        <div className={styles.avatar}>
          <img alt="avatar" className={styles.avatarImg} id="avatarImg"></img>
        </div>
        <div className={styles.userDisplayName} id="userDisplayName"></div>
        <div className={styles.userEmail} id="userEmail"></div>
      </div>
      <Button
        variant="default"
        id="userBeHost"
        // onClick={showbeHost}
      >
        我的開團
      </Button>
    </div>
  )
}
