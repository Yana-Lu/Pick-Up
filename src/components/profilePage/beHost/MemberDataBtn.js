import React, { useState } from 'react'
import { MemberDatas } from './MemberDatas'
import styles from '../ProfilePage.module.scss'

export function MemberDataBtn(props) {
  const [showMemberDatas, setshowMemberDatas] = useState(false)

  const handleShowMemberDatas = () => {
    setshowMemberDatas(false)
  }

  if (props.eventData.members.length > 0) {
    return (
      <div className={styles.eventMembers}>
        <p>參加人數：{props.eventData.members.length} 人</p>
        <div className={styles.memberBtns}>
          <p
            className={styles.memberBtn}
            id="uploadResultBtn"
            onClick={() => {
              setshowMemberDatas(true)
            }}
          >
            (檢視成員資訊)
          </p>
        </div>
        <MemberDatas
          eventData={props.eventData}
          showMemberDatas={showMemberDatas}
          handleShowMemberDatas={handleShowMemberDatas}
        />
      </div>
    )
  } else {
    return (
      <div className={styles.eventMembers}>
        <p>參加人數：{props.eventData.members.length} 人</p>
      </div>
    )
  }
}
