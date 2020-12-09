import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { HomePage } from './components/HomePage'
import { EventPage } from './components/EventPage'
import { signInWithFacebook, signOutWithFacebook, auth } from './components/Firebase'
import styles from './scss/MainPage.module.scss'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

//確認登入狀況

function App() {
  const [uid, setUid] = useState('')

  auth.onAuthStateChanged(function (user) {
    if (user) {
      console.log(auth.currentUser.uid)
      setUid(auth.currentUser.uid)
    } else {
      console.log('使用者尚未登入')
    }
  })

  useEffect(() => {
    let signInBtn = document.getElementById('signInBtn')
    let signOutBtn = document.getElementById('signOutBtn')
    if (uid) {
      signInBtn.style.display = 'none'
      signOutBtn.style.display = 'block'
    } else {
      console.log('使用者尚未登入')
      signInBtn.style.display = 'block'
      signOutBtn.style.display = 'none'
    }
  }, [uid])

  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link to="/">
            <div className={styles.image} />
            {/* <p>PICK UP</p> */}
          </Link>
        </div>
        <div className={styles.motive}>動機緣由</div>
        <div className={styles.actionIntro}>行動介紹</div>
        <div className={styles.startAction}>
          <Link to="/eventpage">我要參與</Link>
        </div>
        <div className={styles.hiUser}></div>
        <div className={styles.signIn}>
          <div className={styles.signInIcon}></div>
          <Button
            variant="primary"
            // class="btn btn-primary"
            className={styles.signInBtn}
            id="signInBtn"
            onClick={signInWithFacebook}
          >
            登入
          </Button>
          <Button
            variant="success"
            // class="btn btn-success"
            className={styles.signOutBtn}
            id="signOutBtn"
            onClick={signOutWithFacebook}
          >
            登出
          </Button>
        </div>
      </header>
      <Route path="/" exact component={HomePage} />
      <Route path="/eventpage" exact component={() => <EventPage uid={uid} />} />
    </div>
  )
}

export default App
