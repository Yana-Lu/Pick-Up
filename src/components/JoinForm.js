import React, { useEffect, useState } from 'react'
// import { useHistory } from 'react-router-dom'
import { JoinEvent } from './Firebase'
// import { showEvent } from './Firebase'
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

  const [thisEvendId, setThisEventId] = useState('')
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
    console.log('JoinDatasubmit')
    JoinEvent(obj)
    //在selected1被存成null前把eventId存下來
    setThisEventId(props.selected1.eventId)
    Swal.fire({
      icon: 'success',
      title: '跟團成功!',
    }).then(() => {
      let closePopup = document.getElementById('joinForm')
      closePopup.style.display = 'none'
      props.setSelected1(null)
      // props.setNewMarker([])
    })
  }

  //改變"想要跟團"的參加人數資訊
  useEffect(() => {
    for (let i = 0; i < props.events.length; i++) {
      if (props.events[i].eventId === thisEvendId) {
        props.ShowMarkerData(props.events[i])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.events])

  function closePopup() {
    let closePopup = document.getElementById('joinForm')
    closePopup.style.display = 'none'
  }

  return (
    <div className={styles.eventFormBG} id="joinForm">
      <div className={styles.eventFormOut}>
        <Form className={styles.eventForm} onSubmit={handleSubmit}>
          <h3>填寫跟團資料</h3>
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
