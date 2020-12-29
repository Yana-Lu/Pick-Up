import React from 'react'
import PropTypes from 'prop-types'
import styles from './EventPage.module.scss'
import { EventNPC } from './EventNPC'
import { Maps } from './map/Maps'
import Fade from 'react-reveal/Fade'

export function EventPage(props) {
  EventPage.propTypes = {
    uid: PropTypes.string,
  }
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
