import React from 'react'
import styles from '../scss/HomePage.module.scss'

export function HomePage() {
  return (
    <div className={styles.main}>
      <div className={styles.keyvisual}>
        <div className={styles.slogan}>說好的陽光沙灘</div>
        <div className={styles.subSlogan}>人煙罕至的沙灘怎麼會有這麼多人造垃圾？</div>
      </div>
      <div className={styles.motive}>
        <div className={styles.title}>
          <h2>動機緣由</h2>
        </div>
        <div className={styles.boxes}>
          <div className={styles.box}></div>
          <div className={styles.box}></div>
          <div className={styles.box}></div>
        </div>
      </div>
      <div className={styles.forWhat}>
        <div className={styles.title}>
          <h2>Pick Up 什麼？</h2>
        </div>
        <div className={styles.intro1}>
          <p>先來看看海灘上色彩繽紛的物品</p>
        </div>
        <div className={styles.intro2}>
          <p>想想看，</p>
          <p>海灘上各式各樣的生活用品，是誰所使用的</p>
          <p>是大海嗎？還是大海裡的生物？</p>
          <p className={styles.highlight}>透過淨灘活動，檢視流入自然環境的人造用品</p>
          <p className={styles.highlight}>反思生活的方式並減少一次性用品的用量</p>
        </div>
        <div className={styles.introImgs}>
          <div className={styles.introImg}></div>
        </div>
      </div>
      <div className={styles.actionIntro}>
        <div className={styles.title}>
          <h2>行動介紹</h2>
        </div>
        <div className={styles.boxes}>
          <div className={styles.box}></div>
          <div className={styles.box}></div>
          <div className={styles.box}></div>
        </div>
      </div>
      <div className={styles.actionJoin}>
        <div className={styles.title}>
          <h2>參與行動</h2>
        </div>
        <div className={styles.boxes}>
          <div className={styles.box}></div>
          <div className={styles.box}></div>
          <div className={styles.box}></div>
        </div>
      </div>
    </div>
  )
}
