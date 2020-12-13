import React, { useEffect, useState } from 'react'
import { ResultForm } from './ResultForm'
//firebase
import { showBeHostEvents } from './Firebase'
import { showBeMemberEvents } from './Firebase'
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
  //儲存點擊的事件資訊
  const [clickEvent, setClickEvent] = useState([])
  const [beMemberEvents, setBeMemberEvents] = useState([])
  console.log(props.userData.uid)
  let uid = props.userData.uid
  useEffect(() => {
    showBeHostEvents(uid, setBeHostEvents)
  }, [uid])
  console.log(beHostEvents)
  useEffect(() => {
    showBeMemberEvents(uid, setBeMemberEvents)
  }, [])
  console.log(beMemberEvents)

  //點擊"我的開團"顯示各事件資訊
  let events = document.getElementById('events')

  // events?.addEventListener('click', () => {
  //   events.style.display = 'flex'
  // })
  // events?.addEventListener('blur', () => {
  //   events.style.display = 'none'
  // })

  function showbeHost(beHostEvents) {
    beHostEvents.forEach((beHostEvent) => {
      console.log('開團資訊')
      let event = document.createElement('div')
      event.className = 'event'
      event.style.width = '45%'
      event.style.margin = '20px'
      event.style.padding = '20px'
      event.style.border = '#a8dadc 2px solid'
      event.style.borderRadius = '30px'
      event.style.boxShadow = 'rgba(149, 157, 165, 0.2) 10px 20px 30px'
      events?.appendChild(event)

      let eventTitle = document.createElement('p')
      eventTitle.className = 'eventTitle'
      eventTitle.textContent = `行動主題：${beHostEvent.title}`
      event?.appendChild(eventTitle)

      // let startDayLocal = beHostEvent.startDate.toString()
      let startDayLocalString = beHostEvent.startDate.toLocaleString()
      let eventStartDate = document.createElement('p')
      eventStartDate.className = 'eventStartDate'
      eventStartDate.textContent = `開始時間：${startDayLocalString}`
      event?.appendChild(eventStartDate)

      let endDayLocalString = beHostEvent.endDate.toLocaleString()
      let eventEndDate = document.createElement('p')
      eventEndDate.className = 'eventEndDate'
      eventEndDate.textContent = `結束時間：${endDayLocalString}`
      event?.appendChild(eventEndDate)

      let eventMumberLimit = document.createElement('p')
      eventMumberLimit.className = 'eventMumberLimit'
      eventMumberLimit.textContent = `人數上限：${beHostEvent.member_limit}`
      event?.appendChild(eventMumberLimit)

      let eventMumbers = document.createElement('p')
      eventMumbers.className = 'eventMumbers'
      eventMumbers.textContent = `參加成員：${beHostEvent.members.length}`
      event?.appendChild(eventMumbers)

      let eventStatus = document.createElement('p')
      eventStatus.className = 'eventStatus'
      if (beHostEvent.status === 'true') {
        eventStatus.textContent = `活動狀態：開放報名中`
        event?.appendChild(eventStatus)
      } else if (beHostEvent.status === 'false') {
        eventStatus.textContent = `活動狀態：活動已舉辦，待成果上傳`
        let resultFormBtn = document.createElement('button')
        resultFormBtn.textContent = `點我上傳活動成果`
        resultFormBtn.style.border = 'gray 1px solid'
        resultFormBtn.style.borderRadius = '30px'
        resultFormBtn.style.padding = '.375rem .75rem'
        resultFormBtn.addEventListener('click', () => {
          showResultForm()
          setClickEvent(beHostEvent.eventId)
          console.log(beHostEvent.eventId)
        })
        event?.appendChild(eventStatus)
        event?.appendChild(resultFormBtn)
      } else {
        eventStatus.textContent = `活動狀態：活動完成`
        event?.appendChild(eventStatus)
      }
    })
  }
  //點擊"我的跟團"顯示各事件資訊
  let followEvents = document.getElementById('followEvents')
  function showBeMember(beMemberEvents) {
    beMemberEvents.forEach((beMemberEvent) => {
      let event = document.createElement('div')
      event.className = 'event'
      event.style.width = '45%'
      event.style.margin = '20px'
      event.style.padding = '20px'
      event.style.border = '#a8dadc 2px solid'
      event.style.borderRadius = '30px'
      event.style.boxShadow = 'rgba(149, 157, 165, 0.2) 10px 20px 30px'
      followEvents?.appendChild(event)

      let eventTitle = document.createElement('p')
      eventTitle.className = 'eventTitle'
      eventTitle.textContent = `行動主題：${beMemberEvent.title}`
      event?.appendChild(eventTitle)

      // let startDayLocal = beHostEvent.startDate.toString()
      let startDayLocalString = beMemberEvent.startDate.toLocaleString()
      let eventStartDate = document.createElement('p')
      eventStartDate.className = 'eventStartDate'
      eventStartDate.textContent = `開始時間：${startDayLocalString}`
      event?.appendChild(eventStartDate)

      let endDayLocalString = beMemberEvent.endDate.toLocaleString()
      let eventEndDate = document.createElement('p')
      eventEndDate.className = 'eventEndDate'
      eventEndDate.textContent = `結束時間：${endDayLocalString}`
      event?.appendChild(eventEndDate)

      let eventMumberLimit = document.createElement('p')
      eventMumberLimit.className = 'eventMumberLimit'
      eventMumberLimit.textContent = `人數上限：${beMemberEvent.member_limit}`
      event?.appendChild(eventMumberLimit)

      let eventMumbers = document.createElement('p')
      eventMumbers.className = 'eventMumbers'
      eventMumbers.textContent = `參加成員：${beMemberEvent.members?.length}`
      event?.appendChild(eventMumbers)

      let eventStatus = document.createElement('p')
      eventStatus.className = 'eventStatus'
      if (beMemberEvent.status === 'true') {
        eventStatus.textContent = `活動狀態：開放報名中`
      } else if (beMemberEvent.status === 'false') {
        eventStatus.textContent = `活動狀態：活動已舉辦，待成果上傳`
      } else {
        eventStatus.textContent = `活動狀態：活動完成`
      }
      event?.appendChild(eventStatus)
    })
  }
  function showResultForm() {
    // let user = JSON.parse(localStorage.getItem('user'))
    let closePopup = document.getElementById('resultForm')
    closePopup.style.display = 'block'
  }

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
          <Button className={styles.button} variant="default" id="userBeHost" onClick={showbeHost(beHostEvents)}>
            我的開團
          </Button>
          <Button className={styles.button} variant="default" id="userBeMember" onClick={showBeMember(beMemberEvents)}>
            我的跟團
          </Button>
        </ButtonToolbar>
        <div className={styles.events} id="events">
          {/* <div className={styles.event}>
            <p className={styles.eventTitle}></p>
            <p className={styles.eventStartDate}></p>
            <p className={styles.eventEndDate}></p>
            <p className={styles.eventMumberLimit}></p>
            <p className={styles.eventMumbers}></p>
            <p className={styles.eventStatus}></p>
          </div> */}
        </div>
        <div className={styles.followEvents} id="followEvents"></div>
      </div>
      <ResultForm eventData={clickEvent} />
    </div>
  )
}
