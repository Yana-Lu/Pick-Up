import { SetEvent } from './Firebase'
import React, { useEffect, useState } from 'react'
import { showEvent } from './Firebase'

export function EventForm() {
  const [title, setTitle] = useState('')
  const [host, setHost] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [memberLimit, setMemberLimit] = useState('')

  //render畫面用
  const [events, setEvents] = useState([])

  useEffect(() => {
    showEvent(setEvents)
  }, [])

  console.log(events)

  function eventChange(e) {
    console.log(e.target.id)
    console.log(e.target.value)
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
    console.log(title, host, email, phone, date, time, memberLimit)
    SetEvent(title, host, email, phone, date, time, memberLimit)
  }

  function closePopup() {
    let closePopup = document.getElementById('eventForm')
    closePopup.style.display = 'none'
  }

  return (
    <div className="eventForm" id="eventForm">
      <form onSubmit={eventSubmit}>
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
  )
}
