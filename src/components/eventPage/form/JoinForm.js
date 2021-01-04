import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { JoinEvent } from '../../Firebase'
import { Form, Button, Col } from 'react-bootstrap'
import Swal from 'sweetalert2'
import styles from '../EventPage.module.scss'

export function JoinForm(props) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const emailInputRef = useRef(null)
  const phoneInputRef = useRef(null)

  const isMobNumber = /^09\d{8}$/
  useEffect(() => {
    phoneInputRef.current.addEventListener('blur', () => {
      if (!isMobNumber.test(phoneInputRef.current.value)) {
        Swal.fire('請輸入正確手機號碼格式')
      }
    })
  }, [phone])

  const isEmail = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
  useEffect(() => {
    emailInputRef.current.addEventListener('blur', () => {
      if (!isEmail.test(emailInputRef.current.value)) {
        Swal.fire('請輸入正確Email格式')
      }
    })
  }, [email])

  function eventChange(e) {
    if (e.target.id === 'memeber-name-input') {
      setName(e.target.value)
    } else if (e.target.id === 'memeber-phone-input') {
      setPhone(e.target.value)
    } else {
      setEmail(e.target.value)
    }
  }

  const [thisEvendId, setThisEventId] = useState('')
  function handleSubmit(e) {
    e.preventDefault()

    const obj = {
      name: name,
      email: email,
      phone: phone,
      eventId: props.event.eventId,
      userId: props.uid,
    }

    if (name === '') {
      Swal.fire('請輸入姓名')
    } else if (phone === '') {
      Swal.fire('請輸入連絡電話')
    } else if (email === '') {
      Swal.fire('請輸入Email')
    } else {
      Swal.fire({
        title: '確定要跟團嗎？',
        showCancelButton: true,
        confirmButtonText: `確定`,
        cancelButtonText: `取消`,
      })
        .then((result) => {
          if (result.isConfirmed) {
            Swal.fire('跟團成功!', '', 'success')
            JoinEvent(obj)
            setThisEventId(props.selectedEvent.eventId)
          }
        })
        .then(() => {
          props.setShowUpJoinForm(false)
          props.setSelectedEvent(null)
        })
    }
  }

  useEffect(() => {
    for (let i = 0; i < props.events.length; i++) {
      if (props.events[i].eventId === thisEvendId) {
        props.ShowMarkerData(props.events[i])
      }
    }
  }, [props.events])

  function closePopup() {
    props.setShowUpJoinForm(false)
  }

  return (
    <div className={`${styles.joinFormBG}  ${props.showUpJoinForm ? styles.showUp : ''}`} id="joinForm">
      <div className={styles.joinFormOut}>
        <Form className={styles.joinForm} onSubmit={handleSubmit}>
          <h3>填寫跟團資料</h3>
          <Form.Group as={Col} controlId="memeber-name-input">
            <Form.Label>姓名</Form.Label>
            <Form.Control type="text" placeholder="範例：宮城獅" onChange={eventChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="memeber-phone-input">
            <Form.Label>連絡電話</Form.Label>
            <Form.Control type="phone" placeholder="範例：0912345678" ref={phoneInputRef} onChange={eventChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="memeber-email-input">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="範例：lion@gmail.com" ref={emailInputRef} onChange={eventChange} />
          </Form.Group>
          <div className={styles.btns}>
            <Button variant="outline-success" type="submit">
              跟團
            </Button>
            <Button variant="default" onClick={closePopup}>
              關閉
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

JoinForm.propTypes = {
  showUpJoinForm: PropTypes.bool,
  setShowUpJoinForm: PropTypes.func,
  event: PropTypes.array,
  uid: PropTypes.string,
  selectedEvent: PropTypes.object,
  setSelectedEvent: PropTypes.func,
  events: PropTypes.array,
  ShowMarkerData: PropTypes.func,
}
