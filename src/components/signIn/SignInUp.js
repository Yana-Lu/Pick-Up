import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { nativeSignIn } from '../Firebase'
import { signInWithGoogle } from '../Firebase'
import { SignUp } from './SignUp'
import { Form, Button, Col } from 'react-bootstrap'
import Swal from 'sweetalert2'
import styles from './SignIn.module.scss'

export function SignInUp(props) {
  const [showSignInForm, setShowSignInForm] = useState(true)
  const [showSignUpForm, setShowSignUpForm] = useState(false)
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const signInEmailInputRef = useRef(null)
  const signInPasswordInputRef = useRef(null)

  const isEmail = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
  useEffect(() => {
    signInEmailInputRef.current.addEventListener('blur', () => {
      if (!isEmail.test(signInEmailInputRef.current.value)) {
        Swal.fire('請輸入正確Email格式')
      }
    })
  }, [signInEmail])

  const isPassword = /\d{8}$/
  useEffect(() => {
    signInPasswordInputRef.current.addEventListener('blur', () => {
      if (!isPassword.test(signInPasswordInputRef.current.value)) {
        Swal.fire('請輸入最少8個字元')
      }
    })
  }, [signInPassword])

  function signInChange(e) {
    if (e.target.id === 'signIn-email-input') {
      setSignInEmail(e.target.value)
    } else {
      setSignInPassword(e.target.value)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const signInObj = {
      email: signInEmail,
      password: signInPassword,
    }

    if (signInEmail === '') {
      Swal.fire('請輸入Email')
    } else if (signInPassword === '') {
      Swal.fire('請輸入密碼')
    } else {
      nativeSignIn(signInObj)
      closePopup()
    }
  }

  function closePopup() {
    props.setShowUpSignInForm(false)
  }
  return (
    <div
      className={`${styles.signInFormBG}
      ${props.showUpSignInForm ? styles.showUp : ''}`}
    >
      <div
        className={`${styles.signInFormOut}
       ${showSignInForm ? styles.showUp : ''}`}
      >
        <Form className={styles.signInForm} onSubmit={handleSubmit}>
          <h3>會員登入</h3>
          <Form.Group as={Col} controlId="signIn-email-input">
            <Form.Control type="email" placeholder="Email" ref={signInEmailInputRef} onChange={signInChange} />
            <Form.Text className="text-muted">Demo用信箱：demo@gmail.com</Form.Text>
          </Form.Group>
          <Form.Group as={Col} controlId="signIn-password-input">
            <Form.Control type="text" placeholder="密碼" ref={signInPasswordInputRef} onChange={signInChange} />
            <Form.Text className="text-muted">Demo用密碼：12345678</Form.Text>
          </Form.Group>
          <div className={styles.btns}>
            <Button variant="outline-success" size="lg" block type="submit">
              登入
            </Button>
            <Button
              variant="outline-danger"
              size="lg"
              block
              onClick={() => {
                signInWithGoogle()
                closePopup()
              }}
            >
              Google 登入
            </Button>
            <Button
              variant="default"
              onClick={() => {
                setShowSignUpForm(true)
                setShowSignInForm(false)
              }}
            >
              立即註冊
            </Button>
            <Button variant="default" onClick={closePopup}>
              關閉
            </Button>
          </div>
        </Form>
      </div>
      <SignUp
        showSignUpForm={showSignUpForm}
        setShowSignUpForm={setShowSignUpForm}
        showSignInForm={showSignInForm}
        setShowSignInForm={setShowSignInForm}
        setShowUpSignInForm={props.setShowUpSignInForm}
      />
    </div>
  )
}

SignInUp.propTypes = {
  showUpSignInForm: PropTypes.bool,
  setShowUpSignInForm: PropTypes.func,
}
