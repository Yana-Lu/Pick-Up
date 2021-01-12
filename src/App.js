import React, { useState, useEffect, useRef } from 'react'
import { Route, Link } from 'react-router-dom'
import { HomePage } from './components/homePage/HomePage'
import { EventPage } from './components/eventPage/EventPage'
import { ProfilePage } from './components/profilePage/ProfilePage'
import { SignInUp } from './components/signIn/SignInUp'
import { signOutWithFacebook, auth } from './components/Firebase'
import { nativeDisplayName } from './components/Firebase'
import { useHistory } from 'react-router-dom'
import styles from './scss/MainPage.module.scss'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const history = useHistory()
  const headRef = useRef(null)
  const userNameRef = useRef(null)

  const [hide, setHide] = useState(false)
  const [uid, setUid] = useState('')
  const [userData, setUserData] = useState('')
  const [showUpNavLinks2, setShowUpNavLinks2] = useState(false)
  const [showXboxBtn, setShowXboxBtn] = useState(true)
  const [showCloseBtn, setShowCloseBtn] = useState(false)
  const [showUpSignInForm, setShowUpSignInForm] = useState(false)
  const [showSignInBtn, setShowSignInBtn] = useState(true)
  const [showSignOutBtn, setShowSignOutBtn] = useState(false)
  const [userName, setUserName] = useState('目前未登入')

  auth.onAuthStateChanged(function (user) {
    if (user) {
      setUid(auth.currentUser.uid)
      setUserData(auth.currentUser)
      if (user.displayName === null) {
        nativeDisplayName(user.uid).then((res) => {
          setUserName(res[0].displayName)
        })
        userNameRef.current.textContent = userName
      } else {
        setUserName(user.displayName)
      }
    } else {
      userNameRef.current.style = 'cursor: default'
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

  const scrollevent = (value) => {
    if (value.scrollTop > 80) {
      setHide(true)
      setShowUpNavLinks2(false)
      setShowCloseBtn(false)
      setShowXboxBtn(true)
    } else {
      setHide(false)
    }
  }

  function showPopUp() {
    setShowUpSignInForm(true)
  }
  function showNavLink2() {
    setShowUpNavLinks2(true)
    setShowCloseBtn(true)
    setShowXboxBtn(false)
  }
  function hideNavLink2() {
    setShowUpNavLinks2(false)
    setShowCloseBtn(false)
    setShowXboxBtn(true)
  }

  return (
    <div className={styles.App} onScroll={(e) => scrollevent(e.target)}>
      <nav className={`${styles.header}  ${hide ? styles.hideUp : ''}`} ref={headRef}>
        <div className={styles.logo}>
          <Link to="/">
            <div className={styles.image} />
          </Link>
        </div>
        <ul className={styles.navLinks1}>
          <li className={styles.startAction}>
            <Link to="/eventpage">我要參與</Link>
          </li>
          <li className={styles.hiUser}>
            <div className={styles.userName} ref={userNameRef} onClick={toProfilePage}>
              {userName}
            </div>
          </li>
          <li className={styles.signIn}>
            <Button
              variant="default"
              className={`${styles.signInBtn} ${showSignInBtn ? '' : styles.signInBtnHideUp}`}
              onClick={showPopUp}
            >
              登入/註冊
            </Button>
            <Button
              variant="default"
              className={`${styles.signOutBtn} ${showSignOutBtn ? '' : styles.signOutBtnHideUp}`}
              onClick={signOutWithFacebook}
            >
              登出
            </Button>
          </li>
        </ul>
        <ul
          className={`${styles.navLinks2}  ${showUpNavLinks2 ? styles.showUp : ''}`}
          // ref={navLink2Ref}
          onClick={hideNavLink2}
        >
          <li className={styles.startAction}>
            <Link to="/eventpage">我要參與</Link>
          </li>
          <li className={styles.hiUser}>
            <div className={styles.userName} ref={userNameRef} onClick={toProfilePage}>
              {userName}
            </div>
          </li>
          <li className={styles.signIn}>
            <Button
              variant="default"
              className={`${styles.signInBtn} ${showSignInBtn ? '' : styles.signInBtnHideUp}`}
              onClick={showPopUp}
            >
              登入/註冊
            </Button>
            <Button
              variant="default"
              className={`${styles.signOutBtn} ${showSignOutBtn ? '' : styles.signOutBtnHideUp}`}
              onClick={signOutWithFacebook}
            >
              登出
            </Button>
          </li>
        </ul>{' '}
        <div className={`${styles.Xbox}  ${showXboxBtn ? styles.showUp : ''}`} onClick={showNavLink2}></div>
        <div className={`${styles.closeBtn}  ${showCloseBtn ? styles.showUp : ''}`} onClick={hideNavLink2}></div>
      </nav>
      <SignInUp showUpSignInForm={showUpSignInForm} setShowUpSignInForm={setShowUpSignInForm} />
      <Route path="/eventpage" exact>
        <EventPage uid={uid} />
      </Route>
      <Route path="/profile" exact>
        <ProfilePage userData={userData} userName={userName} />
      </Route>
      <Route path="/" exact component={HomePage} />
    </div>
  )
}

export default App
