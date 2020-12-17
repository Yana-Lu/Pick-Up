import React from 'react'
//scss
import styles from '../scss/ProfilePage.module.scss'
//StatusAndBtn
import { StatusAndBtn } from './StatusAndBtn'
export function BeMemberEvent(props) {
  console.log(props)

  let weekdays = '星期日,星期一,星期二,星期三,星期四,星期五,星期六'.split(',')

  const memberList = (
    <div>
      <p className={styles.eventTitle}>行動主題：{props.event.title}</p>
      <p className={styles.eventStartDate}>
        活動日期：{new Date(props.event.startTime).getFullYear()}/{new Date(props.event.startTime).getMonth() + 1}/
        {new Date(props.event.startTime).getDate()} {weekdays[new Date(props.event.startTime).getDay()]}
      </p>
      <p className={styles.eventTime}>
        活動時間：{new Date(props.event.startTime).toTimeString().split(':')[0]}:
        {new Date(props.event.startTime).toTimeString().split(':')[1]}~
        {new Date(props.event.endTime).toTimeString().split(':')[0]}:
        {new Date(props.event.endTime).toTimeString().split(':')[1]}
      </p>
      <p className={styles.eventMumberLimit}>人數上限：{props.event.member_limit} 人</p>
      <p className={styles.eventMumbers}>參加人數：{props.event.members.length} 人</p>
      {/* <p className={styles.eventStatus}>活動狀態：{props.event.status}</p> */}
    </div>
  )

  return (
    <div className={styles.event}>
      {memberList}
      <StatusAndBtn eventData={props.event} status={props.event.status} uid={props.uid} />
    </div>
  )
}
