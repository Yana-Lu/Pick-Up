import React, { useEffect, useState } from 'react'
import { JoinEvent } from './Firebase'
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

  //判斷Email格式
  let isEmail = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
  let emailInput = document.getElementById('memeber-email-input')
  useEffect(() => {
    emailInput?.addEventListener('blur', () => {
      if (!isEmail.test(emailInput.value)) {
        Swal.fire('請輸入正確Email格式')
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailInput])
  //判斷手機格式
  let isMobNumber = /^09\d{8}$/
  let phoneInput = document.getElementById('memeber-phone-input')
  useEffect(() => {
    phoneInput?.addEventListener('blur', () => {
      if (!isMobNumber.test(phoneInput.value)) {
        Swal.fire('請輸入正確手機號碼格式')
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneInput])
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

    //判斷有沒有輸入內容
    if (name === '') {
      Swal.fire('請輸入姓名')
    } else if (phone === '') {
      Swal.fire('請輸入連絡電話')
    } else if (email === '') {
      Swal.fire('請輸入Email')
    } else {
      JoinEvent(obj)
      //在selected1被存成null前把eventId存下來
      setThisEventId(props.selected1.eventId)
      Swal.fire({
        title: '確定要跟團嗎？',
        showCancelButton: true,
        confirmButtonText: `確定`,
        cancelButtonText: `取消`,
      })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire('跟團成功!', '', 'success')
          }
        })
        .then(() => {
          let closePopup = document.getElementById('joinForm')
          closePopup.style.display = 'none'
          props.setSelected1(null)
          // props.setNewMarker([])
        })
    }
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
