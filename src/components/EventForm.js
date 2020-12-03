import { SetEvent } from './Firebase'
import React, { useEffect, useState } from 'react'
import { showEvent } from './Firebase'
import styles from '../scss/EventPage.module.scss'

export function EventForm(props) {
  const [title, setTitle] = useState('')
  const [host, setHost] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [memberLimit, setMemberLimit] = useState('')

  console.log(props)
  //render畫面用
  const [events, setEvents] = useState([])

  useEffect(() => {
    showEvent(setEvents)
  }, [])

  console.log(events)
  //從localStorage撈會員資料
  let user = JSON.parse(localStorage.getItem('user'))
  console.log(user)
  // console.log(user.uid)

  function eventChange(e) {
    console.log(e.target.id)
    console.log(e.target.value)
    // setLat(props.lat)
    // setLng(props.lng)
    if (e.target.id === 'event-title-input') {
      setTitle(e.target.value)
    } else if (e.target.id === 'event-name-input') {
      setHost(e.target.value)
    } else if (e.target.id === 'event-phone-input') {
      setPhone(e.target.value)
    } else if (e.target.id === 'event-email-input') {
      setEmail(e.target.value)
    } else if (e.target.id === 'event-date-input') {
      setDate(e.target.value)
    } else if (e.target.id === 'event-time-input') {
      setTime(e.target.value)
    } else {
      setMemberLimit(e.target.value)
    }
  }

  function eventSubmit(e) {
    e.preventDefault()
    // console.log(user.uid)
    //打包表單、經緯度、使用者ID資料
    let obj = {
      title: title,
      host: host,
      email: email,
      phone: phone,
      lat: props.location[0].lat,
      lng: props.location[0].lng,
      date: date,
      time: time,
      memberLimit: memberLimit,
      status: 'true',
      userId: user.uid,
    }
    // console.log(title, host, email, phone, date, time, memberLimit)
    SetEvent(obj)
  }

  function closePopup() {
    let closePopup = document.getElementById('eventForm')
    closePopup.style.display = 'none'
  }

  return (
    <div className={styles.eventFormBG} id="eventForm">
      <div className={styles.eventForm}>
        <form className={styles.Form} onSubmit={eventSubmit}>
          <h3>姓名</h3>
          <input type="text" id="event-name-input" onChange={eventChange} />
          <h3>手機</h3>
          <input type="text" id="event-phone-input" onChange={eventChange} />
          <h3>email</h3>
          <input type="text" id="event-email-input" onChange={eventChange} />
          <h3>活動名稱</h3>
          <input type="text" id="event-title-input" onChange={eventChange} />
          <h3>日期</h3>
          <input type="text" id="event-date-input" onChange={eventChange} />
          <h3>時間</h3>
          <input type="text" id="event-time-input" onChange={eventChange} />
          <h3>人數上限</h3>
          <input type="text" id="event-limit-input" onChange={eventChange} />
          <div>
            <button type="submit">開團</button>
          </div>
        </form>
        <button id="closePopup" onClick={closePopup}>
          關閉
        </button>
      </div>
    </div>
  )
}