import React, { useEffect } from 'react'
import styles from '../scss/EventPage.module.scss'

//alert樣式
import Swal from 'sweetalert2'

export function SelectBtn(props) {
  console.log(props)
  // console.log(props.uid)
  useEffect(() => {
    let mapContain = document.getElementById('mapContain')
    let ifBeHost = document.getElementById('ifBeHost')
    let eventStep1 = document.getElementById('eventStep1')
    let ifBeMember = document.getElementById('ifBeMember')
    let eventStep2 = document.getElementById('eventStep2')
    let eventInfo = document.getElementById('eventInfo')
    mapContain?.addEventListener('click', () => {
      if (!props.uid) {
        Swal.fire({
          icon: 'warning',
          title: '請先登入喔!',
        })
      }
    })

    ifBeHost?.addEventListener('click', () => {
      eventStep1.style.display = 'block'
    })
    ifBeMember?.addEventListener('click', () => {
      eventStep1.style.display = 'none'
    })
    ifBeMember?.addEventListener('click', () => {
      eventStep2.style.display = 'block'
      eventInfo.style.display = 'block'
    })
    ifBeHost?.addEventListener('click', () => {
      eventStep2.style.display = 'none'
      eventInfo.style.display = 'none'
    })
  }, [])
  return (
    <div className={styles.eventHostBG}>
      <div className={styles.eventHost}>
        <br />
        <h3 className={styles.ifBeHost} id="ifBeHost">
          想要開團
        </h3>
        <br />
        <div className={styles.eventStep1} id="eventStep1">
          <h3>1.在地圖上點擊地點設立座標</h3>
          <h3>2.點擊該座標</h3>
          <h3>3.點擊"我要開團"</h3>
          <h3>4.填好完整資料並點擊開團按鈕</h3>
        </div>
      </div>

      <div className={styles.eventJoin}>
        <br />
        <h3 className={styles.ifBeMember} id="ifBeMember">
          想要跟團
        </h3>
        <br />
        <div className={styles.eventStep2} id="eventStep2">
          <h3>1.點擊地圖上想跟團的座標</h3>
          <h3>2.點擊"我想跟團"</h3>
          <h3>3.填好完整資料並點擊跟團按鈕</h3>
        </div>
        <div className={styles.eventInfo} id="eventInfo">
          <p id="infoTitle">行動主題：</p>
          <p id="infoHost">開團人：</p>
          <p id="infoEmail">開團人信箱：</p>
          <p id="infoStartDate">活動時間：</p>
          <p id="infoEndDate">至</p>
          {/* <p id="infoMemgerLimit">人數上限:</p>
            <p id="infoRest">剩餘名額:</p> */}
        </div>
      </div>
    </div>
  )
}
