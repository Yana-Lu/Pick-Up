import React, { useState, useEffect } from 'react'
import { SetEvent } from './Firebase'
import { Form, Button, Col } from 'react-bootstrap'
//時間選擇器
import 'react-datepicker/dist/react-datepicker.css'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers'
//alert樣式
import Swal from 'sweetalert2'
// import { makeStyles } from '@material-ui/core/styles'
// import Alert from '@material-ui/lab/Alert'
//scss
import styles from '../scss/EventPage.module.scss'

export function EventForm(props) {
  const [title, setTitle] = useState('')
  const [host, setHost] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [eventDate, setEventDate] = useState(new Date().setDate(new Date().getDate() + 1))
  const [startTime, setStartTime] = useState(new Date().setDate(new Date().getDate() + 1))
  const [endTime, setEndTime] = useState(new Date().setDate(new Date().getDate() + 1))
  const [memberLimit, setMemberLimit] = useState('')

  //判斷Email格式
  let isEmail = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
  let emailInput = document.getElementById('event-email-input')
  useEffect(() => {
    emailInput?.addEventListener('blur', () => {
      if (!isEmail.test(emailInput.value)) {
        Swal.fire('請輸入正確Email格式')
      }
    })
  }, [emailInput])
  //判斷手機格式
  let isMobNumber = /^09\d{8}$/
  let phoneInput = document.getElementById('event-phone-input')
  useEffect(() => {
    phoneInput?.addEventListener('blur', () => {
      if (!isMobNumber.test(phoneInput.value)) {
        Swal.fire('請輸入正確手機號碼格式')
      }
    })
  }, [phoneInput])
  function eventChange(e) {
    if (e.target.id === 'event-title-input') {
      setTitle(e.target.value)
    } else if (e.target.id === 'event-name-input') {
      setHost(e.target.value)
    } else if (e.target.id === 'event-phone-input') {
      setPhone(e.target.value)
      // setPhoneValue(e.target.value)
    } else if (e.target.id === 'event-email-input') {
      setEmail(e.target.value)
    } else {
      setMemberLimit(e.target.value)
    }
  }

  function handleDateChange(e) {
    // console.log(e)
    setEventDate(e)
    setStartTime(new Date(e.getFullYear(), e.getMonth(), e.getDate(), 0, 0))
    setEndTime(new Date(e.getFullYear(), e.getMonth(), e.getDate(), 0, 0))
  }
  function handleStartTimeChange(e) {
    setStartTime(e.getTime())
  }
  function handleEndTimeChange(e) {
    setEndTime(e.getTime())
  }

  function eventSubmit(e) {
    e.preventDefault()
    //打包表單、經緯度、使用者ID資料
    console.log(typeof host)
    console.log(host.value)

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
    //判斷有沒有輸入內容
    if (host === '') {
      Swal.fire('請輸入姓名')
    } else if (phone === '') {
      Swal.fire('請輸入連絡電話')
    } else if (email === '') {
      Swal.fire('請輸入Email')
    } else if (title === '') {
      Swal.fire('請輸入活動名稱')
    } else if (startTime === endTime) {
      Swal.fire('請確認活動時間')
    } else if (memberLimit === '') {
      Swal.fire('請輸入人數上限')
    } else {
      SetEvent(obj)
      Swal.fire({
        title: '確定要開團嗎？',
        showCancelButton: true,
        confirmButtonText: `確定`,
        cancelButtonText: `取消`,
      })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire('開團成功!', '', 'success')
          }
        })
        .then(() => {
          let closePopup = document.getElementById('eventForm')
          closePopup.style.display = 'none'
          props.setSelected2(null)
          props.setNewMarker([])
        })
    }
  }

  function closePopup() {
    let closePopup = document.getElementById('eventForm')
    closePopup.style.display = 'none'
  }

  return (
    <div className={styles.eventFormBG} id="eventForm">
      <div className={styles.eventFormOut}>
        <Form className={styles.eventForm} onSubmit={eventSubmit}>
          <h3>填寫開團資料</h3>
          <Form.Row as={Col}>
            <Form.Group as={Col} controlId="event-name-input">
              <Form.Label>姓名</Form.Label>
              <Form.Control type="text" placeholder="範例：宮城獅" onChange={eventChange} />
            </Form.Group>
            <Form.Group
              // validationState={getValidationState()}
              as={Col}
              controlId="event-phone-input"
            >
              <Form.Label>連絡電話</Form.Label>
              <Form.Control type="text" placeholder="範例：0912345678" onChange={eventChange} />
            </Form.Group>
          </Form.Row>
          <Form.Group as={Col} controlId="event-email-input">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="範例：lion@gmail.com" onChange={eventChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="event-title-input">
            <Form.Label>活動名稱</Form.Label>
            <Form.Control componentClass="textarea" placeholder="範例：整個海灘都是我的遊樂場" onChange={eventChange} />
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
                id="startTime-picker"
                label="開始時間"
                value={startTime}
                onChange={handleStartTimeChange}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="endTime-picker"
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
            <Form.Control controlId="event-limit-input" type="number" placeholder="範例：5" onChange={eventChange} />
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
