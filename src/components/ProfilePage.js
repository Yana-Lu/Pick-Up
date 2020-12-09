import React, { useEffect } from 'react'
//scss
import styles from '../scss/ProfilePage.module.scss'

export function ProfilePage(props) {
  console.log(props)
  console.log(props.userData.displayName)

  useEffect(() => {
    let avatarImg = document.getElementById('avatarImg')
    let userName = document.getElementById('userDisplayName')
    let userEmail = document.getElementById('userEmail')
    avatarImg.src = `${props?.userData?.photoURL}?type=large`
    userName.textContent = props.userData.displayName
    userEmail.textContent = props.userData.email
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className={styles.ProfileContain}>
      <div className={styles.ProfileData}>
        <div className={styles.avatar}>
          <img alt="avatar" className={styles.avatarImg} id="avatarImg"></img>
        </div>
        <div className={styles.userDisplayName} id="userDisplayName"></div>
        <div className={styles.userEmail} id="userEmail"></div>
      </div>
      <div></div>
    </div>
  )
}
