import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { EventPage } from './EventPage'
import React, { useEffect } from 'react'
import styles from '../scss/HomePage.module.scss'
import '../scss/HomePage.css'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export function HomePage() {
  useEffect(() => {
    let box1 = document.getElementById('box1')
    let box2 = document.getElementById('box2')
    let box3 = document.getElementById('box3')
    let Intro1 = document.getElementById('Intro1')
    let Intro2 = document.getElementById('Intro2')
    let Intro3 = document.getElementById('Intro3')
    box2?.addEventListener('click', () => {
      Intro2.style.display = 'block'
      Intro1.style.display = 'none'
      Intro3.style.display = 'none'
    })
    box3?.addEventListener('click', () => {
      Intro3.style.display = 'block'
      Intro1.style.display = 'none'
      Intro2.style.display = 'none'
    })
    box1?.addEventListener('click', () => {
      Intro1.style.display = 'block'
      Intro2.style.display = 'none'
      Intro3.style.display = 'none'
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
          <div className={styles.box1}>
            <p className={styles.box1Word}>美麗的沙灘</p>
          </div>
          <div className={styles.box2}>
            <p className={styles.box1Word}>走近一看，才發現有好多訪客</p>
          </div>
          <div className={styles.box3}>
            <p className={styles.box1Word}>你也曾注意到沙灘上的不速之客嗎？</p>
          </div>
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
        {/* <div className={styles.subTitle}>
          你是否正好要去享受海洋的擁抱呢？能不能順手撿起沙灘上煞風景的垃圾呢？以下小撇步，讓你的行動更有意義：
        </div> */}
        <div className={styles.boxes}>
          <div className={styles.box1} id="box1">
            <h3>裝備介紹</h3>
          </div>
          <div className={styles.box2} id="box2">
            <h3>安全小叮嚀</h3>
          </div>
          <div className={styles.box3} id="box3">
            <h3>成果上傳</h3>
          </div>
        </div>
        <div className={styles.actionIntroContent}>
          <div className={styles.Intro1} id="Intro1">
            <div className={styles.innerIntro}>
              <h3>行動100%裝備，愛海洋也要愛自己。</h3>
              <div className={styles.IntroImg1}></div>
            </div>
          </div>
          <div className={styles.Intro2} id="Intro2">
            <div className={styles.innerIntro}>
              <h3>注意事項</h3>
              <p>1. 做好防曬措施，並隨時補充水分。</p>
              <p>2. 穿戴手套與包腳鞋，避免被尖銳物刺傷。</p>
              <p>3. 隨時注意潮水之變化。</p>
              <p>4. 避免踩踏傷害海濱之動植物。</p>
              <p>5. 廢棄物請自行打包帶離海邊，或者於事前聯繫當地清潔隊協助清運，事後依約定之位置集中堆放。</p>
              {/* <div className={styles.IntroImg2}></div> */}
            </div>
          </div>
          <div className={styles.Intro3} id="Intro3">
            <div className={styles.innerIntro}>
              <div className={styles.beCareful}>
                <h3>加入海洋廢棄物監測計畫</h3>
                <p>監測主要目的是全球倡議與環境教育呼籲人類應對全球的海灘上的廢棄物有更全盤與準確的掌握。</p>
                <p>必須認清的現實是，響應淨灘行動並不能確保這塊海灘會自動變乾淨。</p>
                <p>所有類型的汙染都必須由汙染源著手改善，因此自己國家丟出的廢棄物還是得要自己想辦法從源頭解決。</p>
                <p>定期監測在地海灘的廢棄物能讓關心的人更靠近問題的核心。</p>
                <p style={{ fontWeight: '700' }}>
                  請登記表格中19項廢棄物的數量，沒有被列出的物品不用登記(但還是要撿喔)。
                </p>
              </div>
              <div className={styles.IntroImg3}></div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.actionJoin}>
        <div className={styles.title}>
          <h2>參與行動</h2>
        </div>
        <div className={styles.actionGoBG}>
          <div className={styles.actionGo}>
            <h3>你可以選擇兩種不同的方式加入行動</h3>
            <div className={styles.actionWay1}>
              <div className={styles.beHost}></div>
              <div className={styles.beHostText}>發起行動當主揪</div>
            </div>
            <div className={styles.actionWay2}>
              <div className={styles.beMember}></div>
              <div className={styles.beMemberText}>跟團加入行動</div>
            </div>
          </div>
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
