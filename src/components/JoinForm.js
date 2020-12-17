import React, { useEffect, useState } from 'react'
// import { useHistory } from 'react-router-dom'
import { JoinEvent } from './Firebase'
import { showEvent } from './Firebase'
// import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Col } from 'react-bootstrap'
import { Form, Button, Col } from 'react-bootstrap'
//alert樣式
import Swal from 'sweetalert2'
//scss
import styles from '../scss/EventPage.module.scss'

export function JoinForm(props) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  console.log(props)
  //render畫面用

  // eslint-disable-next-line no-unused-vars
  const [events, setEvents] = useState([])

  useEffect(() => {
    showEvent(setEvents)
  }, [])

  function eventChange(e) {
    console.log(e.target.id)
    console.log(e.target.value)
    if (e.target.id === 'memeber-name-input') {
      setName(e.target.value)
    } else if (e.target.id === 'memeber-phone-input') {
      setPhone(e.target.value)
    } else {
      setEmail(e.target.value)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    //打包表單
    let obj = {
      name: name,
      email: email,
      phone: phone,
      eventId: props.event.eventId,
      userId: props.uid,
    }
    // console.log(title, host, email, phone, date, time, memberLimit)
    JoinEvent(obj)
    Swal.fire({
      icon: 'success',
      title: '跟團成功!',
    })
      .then(() => {
        console.log('then')
        showEvent(props.setEvents)
      })
      .then(() => {
        let closePopup = document.getElementById('joinForm')
        closePopup.style.display = 'none'
        props.setSelected1(null)
        // props.setNewMarker([])
      })
  }

  function closePopup() {
    let closePopup = document.getElementById('joinForm')
    closePopup.style.display = 'none'
  }

  return (
    <div className={styles.eventFormBG} id="joinForm">
      <div className={styles.eventFormOut}>
        <Form className={styles.eventForm} onSubmit={handleSubmit}>
          <Form.Group as={Col} controlId="memeber-name-input">
            <Form.Label>姓名</Form.Label>
            <Form.Control type="text" placeholder="請輸入姓名" onChange={eventChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="memeber-phone-input">
            <Form.Label>連絡電話</Form.Label>
            <Form.Control type="phone" placeholder="請輸入聯絡電話" onChange={eventChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="memeber-email-input">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="請輸入email" onChange={eventChange} />
          </Form.Group>
          <div className={styles.btns}>
            <Button variant="outline-success" type="submit">
              跟團
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
