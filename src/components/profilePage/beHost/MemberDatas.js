import React from 'react'
import styles from '../ProfilePage.module.scss'
import { Button } from 'react-bootstrap'

export function MemberDatas(props) {
  const datas = props.eventData.members
  const memberDatas = datas.map((data) => (
    <div className={styles.memberDatas}>
      <div className={styles.memberData}>
        <p className={styles.memberName}>姓名：{data.name}</p>
        <p className={styles.memberEmail}>信箱：{data.email}</p>
        <p className={styles.memberPhone}>聯絡電話：{data.phone}</p>
      </div>
    </div>
  ))

  return (
    <div className={`${styles.memberBG} ${props.showMemberDatas ? styles.showMemberDatas : ''}`}>
      <div className={styles.memberDataOut}>
        <div className={styles.memberDataContain}>
          <h3>參加成員</h3>
          {memberDatas}
          <div className={styles.btns}>
            <Button variant="default" onClick={() => props.handleShowMemberDatas(false)}>
              關閉
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
