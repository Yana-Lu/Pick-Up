import React, { useState, useEffect, useRef } from 'react'
import { Route, Link } from 'react-router-dom'
import { HomePage } from './components/homePage/HomePage'
import { EventPage } from './components/eventPage/EventPage'
import { ProfilePage } from './components/profilePage/ProfilePage'
import { signInWithFacebook, signOutWithFacebook, auth } from './components/Firebase'
import { useHistory } from 'react-router-dom'
import styles from './scss/MainPage.module.scss'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const history = useHistory()
  const [hide, setHide] = useState(false)
  const [uid, setUid] = useState('')
  const [userData, setUserData] = useState('')
  // const [userName, setUserName] = useState('使用者尚未登入')
  const [showSignInBtn, setShowSignInBtn] = useState(true)
  const [showSignOutBtn, setShowSignOutBtn] = useState(false)
  const userName = document.getElementById('userName')
  auth.onAuthStateChanged(function (user) {
    if (user) {
      setUid(auth.currentUser.uid)
      setUserData(auth.currentUser)
      userName.textContent = `${auth.currentUser.displayName}`
    } else {
      userName.style = 'cursor: default'
    }
  })

  useEffect(() => {
    if (uid) {
      setShowSignInBtn(false)
      setShowSignOutBtn(true)
    }
  }, [uid])
  function toProfilePage() {
    if (uid) {
      history.push('/profile')
    }
  }

  const headRef = useRef(null)
  const scrollevent = (value) => {
    if (value.scrollTop > 80) {
      setHide(true)
    } else {
      setHide(false)
    }
  }

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
            <Button
              variant="default"
              className={`${styles.signInBtn} ${showSignInBtn ? '' : styles.signInBtnHideUp}`}
              // id="signInBtn"
              onClick={signInWithFacebook}
            >
              登入
            </Button>
            <Button
              variant="default"
              className={`${styles.signOutBtn} ${showSignOutBtn ? '' : styles.signOutBtnHideUp}`}
              // id="signOutBtn"
              onClick={signOutWithFacebook}
            >
              登出
            </Button>
          </li>
        </ul>
      </nav>
      <Route path="/eventpage" exact>
        <EventPage uid={uid} />
      </Route>
      <Route path="/profile" exact>
        <ProfilePage userData={userData} />
      </Route>
      <Route path="/" exact component={HomePage} />
    </div>
  )
}

export default App
