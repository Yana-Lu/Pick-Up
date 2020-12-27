import React from 'react'
import styles from '../scss/EventPage.module.scss'
import { EventNPC } from './EventNPC'
import { Maps } from './Maps'
import Fade from 'react-reveal/Fade'

export function EventPage(props) {
  console.log(props)

  return (
    <div className={styles.container}>
      <div className={styles.containerLeft}>
        <EventNPC uid={props.uid} />
      </div>
      <div className={styles.containerRight}>
        <Fade top>
          <h2>活動地點</h2>
          <div className={styles.mapContain} id="mapContain">
            <Maps uid={props.uid} />
          </div>
        </Fade>
      </div>
    </div>
  )
}
