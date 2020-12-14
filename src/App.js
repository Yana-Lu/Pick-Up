import React, { useState, useEffect } from 'react'
import { Route, Link } from 'react-router-dom'
import { HomePage } from './components/HomePage'
import { EventPage } from './components/EventPage'
import { ProfilePage } from './components/ProfilePage'
import { signInWithFacebook, signOutWithFacebook, auth } from './components/Firebase'
import styles from './scss/MainPage.module.scss'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'

//確認登入狀況

function App() {
  let history = useHistory()
  const [uid, setUid] = useState('')
  const [userData, setUserData] = useState('')
  let userName = document.getElementById('userName')
  auth.onAuthStateChanged(function (user) {
    if (user) {
      console.log(auth.currentUser)
      setUid(auth.currentUser.uid)
      setUserData(auth.currentUser)
      userName.textContent = `Hi~${auth.currentUser.displayName}`
    } else {
      console.log('使用者尚未登入')
    }
  })

  useEffect(() => {
    let signInBtn = document.getElementById('signInBtn')
    let signOutBtn = document.getElementById('signOutBtn')

    if (uid) {
      //顯示使用者名字
      signInBtn.style.display = 'none'
      signOutBtn.style.display = 'block'
    } else {
      console.log('使用者尚未登入')
      signInBtn.style.display = 'block'
      signOutBtn.style.display = 'none'
    }
  }, [uid])
  function toProfilePage() {
    // let user = JSON.parse(localStorage.getItem('user'))
    if (!uid) {
      Swal.fire({
        icon: 'warning',
        title: '請先登入喔!',
      })
    } else {
      history.push('/profile')
    }
  }

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
        <div className={styles.hiUser}>
          {/* <Link to="/profile"> */}
          <div className={styles.userName} id="userName" onClick={toProfilePage}>
            目前未登入
          </div>
          {/* </Link> */}
        </div>
        <div className={styles.signIn}>
          <Button variant="primary" className={styles.signInBtn} id="signInBtn" onClick={signInWithFacebook}>
            登入
          </Button>
          <Button variant="success" className={styles.signOutBtn} id="signOutBtn" onClick={signOutWithFacebook}>
            登出
          </Button>
        </div>
      </header>
      <Route path="/" exact component={HomePage} />
      <Route path="/eventpage" exact component={() => <EventPage uid={uid} />} />
      <Route path="/profile" exact component={() => <ProfilePage userData={userData} />} />
    </div>
  )
}

export default App
