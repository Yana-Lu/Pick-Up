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
  // console.log(props.userData.uid)
  useEffect(() => {
    try {
      showBeHostEvents(uid, setBeHostEvents)
    } catch (err) {
      console.log(err.message)
    }
  }, [uid])
  // console.log(beHostEvents)

  useEffect(() => {
    try {
      showBeMemberEvents(uid, setBeMemberEvents)
    } catch (err) {
      console.log(err.message)
    }
  }, [uid])
  // console.log(beMemberEvents)

  let events = document.getElementById('events')
  let userBeHostBtn = document.getElementById('userBeHost')
  let followEvents = document.getElementById('followEvents')
  let userBeMemberBtn = document.getElementById('userBeMember')

  //點擊"我的開團"顯示各事件資訊
  userBeHostBtn?.addEventListener('click', () => {
    events.style.display = 'flex'
  })
  userBeMemberBtn?.addEventListener('click', () => {
    events.style.display = 'none'
  })

  //點擊"我的跟團"顯示各事件資訊
  userBeMemberBtn?.addEventListener('click', () => {
    followEvents.style.display = 'flex'
  })
  userBeHostBtn?.addEventListener('click', () => {
    followEvents.style.display = 'none'
  })
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
          <Button className={styles.button} variant="default" id="userBeHost">
            我的開團
          </Button>
          <Button className={styles.button} variant="default" id="userBeMember">
            我的跟團
          </Button>
        </ButtonToolbar>
        <div className={styles.events} id="events">
          <ProfilePageBeHost
            uid={props.userData.uid}
            events={beHostEvents}
            beHostEvents={beHostEvents}
            setBeHostEvents={setBeHostEvents}
          />
        </div>
        <div className={styles.events} id="followEvents">
          <ProfilePageBeMember uid={props.userData.uid} events={beMemberEvents} />
        </div>
      </div>
    </div>
  )
}
