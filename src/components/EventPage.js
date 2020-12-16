import React from 'react'
import styles from '../scss/EventPage.module.scss'
import { SelectBtn } from './SelectBtn'
import { Maps } from './Maps'
//alert樣式
// import Swal from 'sweetalert2'

export function EventPage(props) {
  console.log(props)
  // console.log(props.uid)

  return (
    <div className={styles.container}>
      <div className={styles.containerLeft}>
        <SelectBtn uid={props.uid} />
      </div>
      <div className={styles.containerRight}>
        <h2>活動地點</h2>
        <div className={styles.mapContain} id="mapContain">
          <Maps uid={props.uid} />
        </div>
      </div>
    </div>
  )
}
