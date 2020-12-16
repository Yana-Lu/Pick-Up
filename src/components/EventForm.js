import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { SetEvent } from './Firebase'
import { showEvent } from './Firebase'
import { Form, Button, Col } from 'react-bootstrap'
// import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Col } from 'react-bootstrap'
//時間選擇器
import 'react-datepicker/dist/react-datepicker.css'
import 'date-fns'
// import Grid from '@material-ui/core/Grid'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers'
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
  const [eventDate, setEventDate] = useState(new Date())
  const [startTime, setStartTime] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date())
  const [memberLimit, setMemberLimit] = useState('')

  // console.log(props)
  // console.log(props.events)
  // console.log(props.uid)

  function eventChange(e) {
    console.log(e)
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
    } else {
      setMemberLimit(e.target.value)
    }
  }
  function handleDateChange(e) {
    console.log(e)
    // console.log(e.getTime())
    // console.log(e.valueOf())
    console.log(e.getFullYear())
    console.log(e.getMonth() + 1)
    console.log(e.getDate())
    setEventDate(e)
    setStartTime(new Date(e.getFullYear(), e.getMonth(), e.getDate(), 0, 0))
    setEndTime(new Date(e.getFullYear(), e.getMonth(), e.getDate(), 0, 0))
  }
  function handleStartTimeChange(e) {
    console.log(e)
    console.log(e.getTime())
    setStartTime(e.getTime())
  }
  function handleEndTimeChange(e) {
    console.log(e)
    console.log(e.getTime())
    setEndTime(e.getTime())
  }

  function eventSubmit(e) {
    e.preventDefault()
    //打包表單、經緯度、使用者ID資料
    let obj = {
      title: title,
      host: host,
      email: email,
      phone: phone,
      lat: props.location[0].lat,
      lng: props.location[0].lng,
      //時間選擇
      startTime: startTime,
      endTime: endTime,
      memberLimit: memberLimit,
      status: 'true',
      userId: props.uid,
    }
    console.log('submit')
    // console.log(title, host, email, phone, date, time, memberLimit)
    SetEvent(obj)
    Swal.fire({
      icon: 'success',
      title: '開團成功!',
    }).then(() => {
      console.log('then')
      showEvent(props.setEvents)
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
          <Form.Group as={Col}>
            <Form.Label>活動時間</Form.Label>
            <div className={styles.startDateNav}></div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                //最小可選日期為明天
                minDate={new Date().setDate(new Date().getDate() + 1)}
                autoOk
                // disablePast
                disableToolbar
                variant="inline"
                format="yyyy/MM/dd"
                margin="normal"
                id="date-picker-inline"
                label="日期"
                value={eventDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Form.Group>
          <Form.Group as={Col}>
            <div className={styles.startDateNav}></div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                className={styles.startTime}
                margin="normal"
                id="time-picker"
                label="開始時間"
                value={startTime}
                onChange={handleStartTimeChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="結束時間"
                value={endTime}
                onChange={handleEndTimeChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </MuiPickersUtilsProvider>
          </Form.Group>
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
