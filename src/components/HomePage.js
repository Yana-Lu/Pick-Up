import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { EventPage } from './EventPage'
import React, { useEffect } from 'react'
import styles from '../scss/HomePage.module.scss'
import '../scss/HomePage.css'
import { Button } from 'react-bootstrap'
import Fade from 'react-reveal/Fade'
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
      <section className={styles.landing}>
        <Fade top>
          <div className={styles.bigText}>Pick up for the future.</div>
        </Fade>
      </section>
      <div className={styles.mainBG1}>
        <div className={styles.motive}>
          <div className={styles.title}>
            <h2>Pick Up 的起點</h2>
          </div>
          <p>台灣是海島國家，海洋的一切與我們息息相關。海洋不曾言語，卻能透過其他方式告訴我們許多訊息。</p>
          <div className={styles.boxes}>
            <div className={styles.box1}>
              <div className={styles.img}></div>
              <p className={styles.box1Word1}>無人的沙灘</p>
              <p className={styles.box1Word2}>休閒放鬆的好去處</p>
            </div>
            <div className={styles.box2}>
              <div className={styles.img}></div>
              <p className={styles.box2Word1}>走近一看</p>
              <p className={styles.box2Word2}>沙灘上五顏六色的各式物品</p>
            </div>
            <div className={styles.box3}>
              <div className={styles.img}></div>
              <p className={styles.box3Word1}>還有無辜的受害者</p>
              <p className={styles.box3Word2}>被廢棄魚網纏住的海洋生物</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mainBG2}>
        <div className={styles.forWhat}>
          <div className={styles.title}>
            <h2>Pick Up 想做的事</h2>
          </div>
          <div className={styles.intro1}>
            <p className={styles.highlight}>
              參與淨灘活動並不難，透過 Pick Up 可以發起或參與活動，一同拾起沙灘上的不速之客。
            </p>
            <br />
            <p>
              但淨灘所拾起的垃圾僅是流入自然環境中的一部分，更重要的是減少垃圾產生。
              <br />
              <br />
              希望透過淨灘活動及親身體驗，讓更多人了解垃圾減量、減少使用一次性產品的重要。
            </p>
          </div>
          <div className={styles.introImgs}>
            <div className={styles.introImg1}></div>
            <div className={styles.introImg2}></div>
            <div className={styles.introImg3}></div>
            <div className={styles.introImg4}></div>
          </div>
        </div>
      </div>
      <div className={styles.mainBG3}>
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
      </div>
      <div className={styles.mainBG4}>
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
      </div>
      <Route path="/eventpage" exact component={EventPage} />
      <div className={styles.footer}></div>
    </div>
  )
}
