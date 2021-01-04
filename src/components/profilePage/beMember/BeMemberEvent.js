import React from 'react'
import PropTypes from 'prop-types'
import styles from '../ProfilePage.module.scss'
import { StatusAndBtn } from '../StatusAndBtn'

export function BeMemberEvent(props) {
  const weekdays = '星期日,星期一,星期二,星期三,星期四,星期五,星期六'.split(',')

  const memberList = (
    <div>
      <p className={styles.eventTitle}>行動主題：{props.event.title}</p>
      <p className={styles.eventHost}>主辦人：{props.event.host}</p>
      <p className={styles.eventHost}>主辦人信箱：{props.event.email}</p>
      <p className={styles.eventHost}>主辦人聯絡電話：{props.event.phone}</p>
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
    </div>
  )

  return (
    <div className={styles.event}>
      {memberList}
      <StatusAndBtn eventData={props.event} status={props.event.status} uid={props.uid} />
    </div>
  )
}

BeMemberEvent.propTypes = {
  event: PropTypes.object,
  uid: PropTypes.string,
}
