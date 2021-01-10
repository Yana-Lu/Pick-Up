import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { nativeSignUp } from '../Firebase'
import { Form, Button, Col } from 'react-bootstrap'
import styles from './SignIn.module.scss'
import Swal from 'sweetalert2'

export function SignUp(props) {
  const [signUpName, setSignUpName] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const signUpNameInputRef = useRef(null)
  const signUpEmailInputRef = useRef(null)
  const signUpPasswordInputRef = useRef(null)

  const isEmail = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
  useEffect(() => {
    signUpEmailInputRef.current.addEventListener('blur', () => {
      if (!isEmail.test(signUpEmailInputRef.current.value)) {
        Swal.fire('請輸入正確Email格式')
      }
    })
  }, [signUpEmail])

  const isPassword = /\d{8}$/
  useEffect(() => {
    signUpPasswordInputRef.current.addEventListener('blur', () => {
      if (!isPassword.test(signUpPasswordInputRef.current.value)) {
        Swal.fire('請輸入最少8個字元')
      }
    })
  }, [signUpPassword])

  function signUpChange(e) {
    if (e.target.id === 'signUp-name-input') {
      setSignUpName(e.target.value)
    } else if (e.target.id === 'signUp-email-input') {
      setSignUpEmail(e.target.value)
    } else {
      setSignUpPassword(e.target.value)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const signUpObj = {
      name: signUpName,
      email: signUpEmail,
      password: signUpPassword,
    }

    if (signUpName === '') {
      Swal.fire('請輸入姓名')
    } else if (signUpEmail === '') {
      Swal.fire('請輸入Email')
    } else if (signUpPassword === '') {
      Swal.fire('請輸入密碼')
    } else {
      nativeSignUp(signUpObj)
      closePopup()
    }
  }

  function closePopup() {
    props.setShowUpSignInForm(false)
  }
  return (
    <div
      className={`${styles.signUpFormOut}
       ${props.showSignUpForm ? styles.showUp : ''}`}
    >
      <Form className={styles.signUpForm} onSubmit={handleSubmit}>
        <h3>會員註冊</h3>
        <Form.Group as={Col} controlId="signUp-name-input">
          <Form.Control type="text" placeholder="姓名" ref={signUpNameInputRef} onChange={signUpChange} />
        </Form.Group>
        <Form.Group as={Col} controlId="signUp-email-input">
          <Form.Control type="email" placeholder="Email" ref={signUpEmailInputRef} onChange={signUpChange} />
        </Form.Group>
        <Form.Group as={Col} controlId="signUp-password-input">
          <Form.Control type="text" placeholder="密碼" ref={signUpPasswordInputRef} onChange={signUpChange} />
        </Form.Group>
        <div className={styles.btns}>
          <Button variant="outline-success" size="lg" block type="submit">
            註冊
          </Button>
          <Button
            variant="default"
            onClick={() => {
              props.setShowSignUpForm(false)
              props.setShowSignInForm(true)
            }}
          >
            立即登入
          </Button>
          <Button variant="default" onClick={closePopup}>
            關閉
          </Button>
        </div>
      </Form>
    </div>
  )
}

SignUp.propTypes = {
  showSignUpForm: PropTypes.bool,
  setShowSignUpForm: PropTypes.func,
  showSignInForm: PropTypes.bool,
  setShowSignInForm: PropTypes.func,
  setShowUpSignInForm: PropTypes.func,
}
