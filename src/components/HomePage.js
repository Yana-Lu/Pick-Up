import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { EventPage } from './EventPage'
import React from 'react'
import styles from '../scss/HomePage.module.scss'
import '../scss/HomePage.css'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export function HomePage() {
  let intros = document.querySelectorAll('.visual')
  intros[0]?.classList.add('current')
  function clickBox(boxIndex) {
    for (let i = 0; i < 3; i++) {
      intros[i]?.classList.remove('current')
    }
    intros[boxIndex]?.classList.add('current')
  }

  return (
    <div className={styles.main}>
      <div className={styles.keyvisual}>
        <div className={styles.slogan}>Sunshine, Beach, glamorous life?</div>
        <div className={styles.subSlogan}>What kind of future do you want?</div>
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
          <p className={styles.highlight}>透過活動過程，檢視流入自然環境的人造用品</p>
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
        <div className={styles.subTitle}>
          你是否正好要去享受海洋的擁抱呢？能不能順手撿起沙灘上煞風景的垃圾呢？以下小撇步，讓你的行動更有意義：
        </div>
        <div className={styles.boxes}>
          <div className={styles.box} onClick={clickBox(0)}>
            <h3>裝備介紹</h3>
          </div>
          <div className={styles.box} onClick={clickBox(1)}>
            <h3>安全小叮嚀</h3>
          </div>
          <div className={styles.box} onClick={clickBox(2)}>
            <h3>成果上傳</h3>
          </div>
        </div>
        <div className={styles.actionIntroContent}>
          <div className={styles.Intro}>
            <div className={styles.innerIntro}>
              <h3>行動100%裝備，愛海洋也要愛自己。</h3>
              <div className={styles.IntroImg1}></div>
            </div>
          </div>
          <div className="Intro"></div>
          <div className="Intro"></div>
        </div>
      </div>
      <div className={styles.actionJoin}>
        <div className={styles.title}>
          <h2>參與行動</h2>
        </div>
        <div className={styles.actionGo}>
          <h3>你可以選擇兩種不同的方式加入行動</h3>
          <h3>1.發起行動當主揪</h3>
          <h3>2.成為開團中的行動成員</h3>
        </div>
        <div className={styles.actionStart}>
          <Link to="/eventpage">
            <Button variant="primary">我要參與</Button>
          </Link>
        </div>
      </div>
      <Route path="/eventpage" exact component={EventPage} />
    </div>
  )
}
