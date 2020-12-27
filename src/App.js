import React, { useState, useEffect, useRef } from 'react'
// import { Route, Link } from 'react-router-dom'
import { Router, Route, Link } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import { HomePage } from './components/HomePage'
import { EventPage } from './components/EventPage'
import { ProfilePage } from './components/ProfilePage'
import { signInWithFacebook, signOutWithFacebook, auth } from './components/Firebase'
import { useHistory } from 'react-router-dom'
//UI
import './scss/HomePage.css'
import styles from './scss/MainPage.module.scss'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2'
// import Fade from 'react-reveal/Fade'
// import { gsap, TweenLite } from 'gsap'

//確認登入狀況
function App() {
  let history = useHistory()
  const [uid, setUid] = useState('')
  const [userData, setUserData] = useState('')
  let userName = document.getElementById('userName')
  let [hide, setHide] = useState(false)
  auth.onAuthStateChanged(function (user) {
    if (user) {
      setUid(auth.currentUser.uid)
      setUserData(auth.currentUser)
      userName.textContent = `${auth.currentUser.displayName}`
    } else {
      console.log('使用者尚未登入')
      userName.style = 'cursor: default'
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
    if (uid) {
      history.push('/profile')
    }
  }
  // 滾動出現Header
  const headRef = useRef(null)

  const scrollevent = (value) => {
    // let st = value.scrollTop
    // console.log(value.scrollTop)
    if (value.scrollTop > 80) {
      setHide(true)
    } else {
      setHide(false)
    }
  }
  // console.log(lastScroll)
  return (
    <div className={styles.App} onScroll={(e) => scrollevent(e.target)}>
      <nav className={`${styles.header}  ${hide ? styles.hideUp : ''}`} ref={headRef}>
        <div className={styles.logo}>
          <Link to="/">
            <div className={styles.image} />
          </Link>
        </div>
        <ul className={styles.navLinks}>
          <li className={styles.startAction}>
            <Link to="/eventpage">我要參與</Link>
          </li>
          <li className={styles.hiUser}>
            <div className={styles.userName} id="userName" onClick={toProfilePage}>
              目前未登入
            </div>
          </li>
          <li className={styles.signIn}>
            <Button variant="default" className={styles.signInBtn} id="signInBtn" onClick={signInWithFacebook}>
              登入
            </Button>
            <Button variant="default" className={styles.signOutBtn} id="signOutBtn" onClick={signOutWithFacebook}>
              登出
            </Button>
          </li>
        </ul>
      </nav>
      {/* <Router> */}
      <Route path="/eventpage" exact>
        <EventPage uid={uid} />
      </Route>
      <Route path="/profile" exact>
        <ProfilePage userData={userData} />
      </Route>
      <Route path="/" exact component={HomePage} />
      {/* <ScrollToTop /> */}
      {/* </Router> */}
    </div>
  )
}

export default App
