import React, { useEffect, useState } from 'react'
import { SetEvent } from './Firebase'
import { showEvent } from './Firebase'
import { Form, Button, Col } from 'react-bootstrap'
// import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Col } from 'react-bootstrap'
//時間選擇器
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
//alert樣式
import Swal from 'sweetalert2'
//scss
import styles from '../scss/EventPage.module.scss'

export function EventForm(props) {
  const [title, setTitle] = useState('')
  const [host, setHost] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  // const [date, setDate] = useState('')
  // const [time, setTime] = useState('')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [memberLimit, setMemberLimit] = useState('')

  console.log(props)
  //render畫面用
  const [events, setEvents] = useState([])

  useEffect(() => {
    showEvent(setEvents)
  }, [])

  console.log(events)
  console.log(props.uid)

  function eventChange(e) {
    console.log(e)
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
    } else {
      setMemberLimit(e.target.value)
    }
  }
  function handleStartDateChange(e) {
    console.log(e)
    setStartDate(e)
  }
  function handleEndDateChange(e) {
    console.log(e)
    setEndDate(e)
  }

  function eventSubmit(e) {
    //打包表單、經緯度、使用者ID資料
    let obj = {
      title: title,
      host: host,
      email: email,
      phone: phone,
      lat: props.location[0].lat,
      lng: props.location[0].lng,
      startDate: startDate,
      endDate: endDate,
      memberLimit: memberLimit,
      status: 'true',
      userId: props.uid,
    }
    // console.log(title, host, email, phone, date, time, memberLimit)
    SetEvent(obj)
    Swal.fire({
      icon: 'success',
      title: '開團成功!',
    })
  }

  function closePopup() {
    let closePopup = document.getElementById('eventForm')
    closePopup.style.display = 'none'
  }

  return (
    <div className={styles.eventFormBG} id="eventForm">
      <div className={styles.eventFormOut}>
        <Form className={styles.eventForm} onSubmit={eventSubmit}>
          <Form.Row as={Col}>
            <Form.Group as={Col} controlId="event-name-input">
              <Form.Label>姓名</Form.Label>
              <Form.Control type="text" placeholder="請輸入姓名" onChange={eventChange} />
            </Form.Group>
            <Form.Group as={Col} controlId="event-phone-input">
              <Form.Label>連絡電話</Form.Label>
              <Form.Control type="phone" placeholder="請輸入聯絡電話" onChange={eventChange} />
            </Form.Group>
          </Form.Row>
          <Form.Group as={Col} controlId="event-email-input">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="請輸入email" onChange={eventChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="event-title-input">
            <Form.Label>活動名稱</Form.Label>
            <Form.Control placeholder="請輸入活動名稱" onChange={eventChange} />
          </Form.Group>
          {/* <Form.Row> */}
          <Form.Group as={Col}>
            <Form.Label>活動時間</Form.Label>
            <div className={styles.startDateNav}></div>
            <DatePicker
              class="form-control"
              className={styles.startDate}
              selected={startDate}
              controlId="event-startDate-input"
              onChange={handleStartDateChange}
              showTimeSelect
              dateFormat="Pp"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>至</Form.Label>
            <DatePicker
              class="form-control"
              className={styles.startDate}
              selected={endDate}
              controlId="event-endDate-input"
              onChange={handleEndDateChange}
              showTimeSelect
              dateFormat="Pp"
            />
          </Form.Group>
          {/* </Form.Row> */}
          <Form.Group as={Col} controlId="event-limit-input">
            <Form.Label>人數上限</Form.Label>
            <Form.Control controlId="event-limit-input" placeholder="請輸入參與人數上限" onChange={eventChange} />
          </Form.Group>
          <div className={styles.btns}>
            <Button variant="outline-success" type="submit">
              開團
            </Button>
            <Button variant="default" id="closePopup" onClick={closePopup}>
              關閉
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
