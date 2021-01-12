import React, { useEffect, useState, useRef } from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { EventPage } from '../eventPage/EventPage'
import styles from './HomePage.module.scss'
import './HomePage.css'
import { Button } from 'react-bootstrap'
import Fade from 'react-reveal/Fade'
import 'bootstrap/dist/css/bootstrap.min.css'

export function HomePage() {
  const mainRef = useRef(null)
  const keyTextRef = useRef(null)
  const keyConsoleRef = useRef(null)
  const [showEquipment, setShowEquipment] = useState(true)
  const [showSafetyRules, setShowSafetyRules] = useState(false)
  const [showExecution, setShowExecution] = useState(false)
  const [showResultCategory, setShowResultCategory] = useState(false)

  function clickEquipmentBtn() {
    setShowEquipment(true)
    setShowSafetyRules(false)
    setShowExecution(false)
  }
  function clickSafetyRulesBtn() {
    setShowEquipment(false)
    setShowSafetyRules(true)
    setShowExecution(false)
  }
  function clickExecutionBtn() {
    setShowEquipment(false)
    setShowSafetyRules(false)
    setShowExecution(true)
  }

  function scrollToTop() {
    mainRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    consoleText(['Future.', 'Earth.', 'Love.'], ['skyblue', 'aquamarine', '#f08080'])

    consoleText(['Future.', 'Earth.', 'Love.'], ['skyblue', 'aquamarine', '#f08080'])

    function consoleText(words, colors) {
      if (colors === undefined) colors = ['#fff']
      let visible = true
      let letterCount = 1
      let x = 1
      let waiting = false

      keyTextRef?.current.setAttribute('style', 'color:' + colors[0])
      window.setInterval(function () {
        if (keyTextRef.current !== null) {
          if (letterCount === 0 && waiting === false) {
            waiting = true
            keyTextRef.current.innerHTML = words[0].substring(0, letterCount)
            window.setTimeout(function () {
              if (keyTextRef.current !== null) {
                const usedColor = colors.shift()
                colors.push(usedColor)
                const usedWord = words.shift()
                words.push(usedWord)
                x = 1
                keyTextRef.current.setAttribute('style', 'color:' + colors[0])
                letterCount += x
                waiting = false
              }
            }, 1000)
          } else if (letterCount === words[0].length + 1 && waiting === false) {
            waiting = true
            window.setTimeout(function () {
              x = -1
              letterCount += x
              waiting = false
            }, 1000)
          } else if (waiting === false) {
            keyTextRef.current.innerHTML = words[0].substring(0, letterCount)
            letterCount += x
          }
        }
      }, 120)
      window.setInterval(function () {
        if (keyConsoleRef.current !== null) {
          if (visible === true) {
            keyConsoleRef.current.className = 'console-underscore hidden'
            visible = false
          } else {
            keyConsoleRef.current.className = 'console-underscore'

            visible = true
          }
        }
      }, 400)
    }
  }, [])
  return (
    <div className={styles.main} ref={mainRef} id="target">
      <section className={styles.landing}>
        <div className={styles.bigText}>
          <span>For the</span>
          <div className="console-container">
            <span ref={keyTextRef} id="text"></span>
            <div className="console-underscore" ref={keyConsoleRef} id="console">
              &#95;
            </div>
          </div>
        </div>
      </section>
      <div className={styles.mainBG1}>
        <div className={styles.motive}>
          <div className={styles.title}>
            <h2>Pick Up 的起點</h2>
          </div>
          <p className={styles.subTitle}>
            台灣是海島國家，身為島國的人民，海洋與我們息息相關，但我們卻少有機會好好親近與了解。
            <br />
            海洋不曾言語，卻能透過其他方式表達，走一趟海灘聽取其中的訊息吧。
          </p>
          <div className={styles.boxes}>
            <figure className="hero-grid effect-move">
              <div className="hero-grid-image1 effect-image"></div>
              <figcaption className="hero-grid-content">
                <p className="hero-grid-title effect-target">無人的沙灘</p>
                <p className="hero-grid-text effect-target effect-text">休閒放鬆的好去處</p>
              </figcaption>
            </figure>
            <figure className="hero-grid effect-move">
              <div className="hero-grid-image2 effect-image"></div>
              <figcaption className="hero-grid-content">
                <p className="hero-grid-title effect-target">走近一看</p>
                <p className="hero-grid-text effect-target effect-text">沙灘上五顏六色的各式物品</p>
              </figcaption>
            </figure>
            <figure className="hero-grid effect-move">
              <div className="hero-grid-image3 effect-image"></div>
              <figcaption className="hero-grid-content">
                <p className="hero-grid-title effect-target">還有無辜的受害者</p>
                <p className="hero-grid-text effect-target effect-text">被廢棄魚網纏住的海洋生物</p>
              </figcaption>
            </figure>
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
            <p>點擊以下圖示看介紹內容。</p>
          </div>
          <div className={styles.boxes}>
            <div className={styles.box1} onClick={clickEquipmentBtn} id="box1">
              <h3>裝備介紹</h3>
            </div>
            <div className={styles.box2} onClick={clickSafetyRulesBtn} id="box2">
              <h3>安全小叮嚀</h3>
            </div>
            <div className={styles.box3} onClick={clickExecutionBtn} id="box3">
              <h3>活動執行</h3>
            </div>
          </div>
          <div className={styles.actionIntroContent}>
            <Fade>
              <div className={`${styles.Intro1}  ${showEquipment ? styles.showUp : ''}`} id="Intro1">
                <div className={styles.innerIntro}>
                  <p className={styles.subTitle}>
                    服裝建議以透氣、舒適，方便戶外活動的衣物為佳，建議可參考天氣預報調整服裝。
                  </p>
                  <div className={styles.IntroImg1}></div>
                  <p>圖片來源：台灣環境資訊協會《淨灘手冊》</p>
                </div>
              </div>
            </Fade>
            <Fade>
              <div className={`${styles.Intro2}  ${showSafetyRules ? styles.showUp : ''}`} id="Intro2">
                <div className={styles.innerIntro}>
                  <div className={styles.IntroTitle}>
                    <div className={styles.noticeImg}></div>
                    <h3>注意事項</h3>
                  </div>
                  <br />
                  <p>做好防曬措施，並隨時補充水分。</p>
                  <br />
                  <p>穿戴手套與包腳鞋，避免徒手撿拾廢棄物及伸手到看不淸楚的位置撈廢棄物。</p>
                  <br />
                  <p>
                    隨時注意潮水及天氣變化，如果聽到雷聲，應盡速離開沙灘、空曠地區，移動時也優先離開海水可觸及、或已潮濕的海灘範圍。
                  </p>
                  <br />
                  <p>避免踩踏傷害海濱之動植物及危險物品。</p>
                  <br />
                  <p>廢棄物請自行打包帶離海邊，或者於事前聯繫當地清潔隊協助清運，事後依約定之位置集中堆放。</p>
                </div>
              </div>
            </Fade>
            <Fade>
              <div className={`${styles.Intro3}  ${showExecution ? styles.showUp : ''}`} id="Intro3">
                <div className={styles.innerIntro}>
                  <div className={styles.actionStep}>
                    <div className={styles.IntroTitle}>
                      <div className={styles.stepImg}></div>
                      <h3>執行步驟</h3>
                    </div>
                    <p>淨灘目標物以不可分解的人造廢棄物為主，貝殼、漂流木、生 物屍體等可天然分解者不撿。</p>
                    <p>撿拾廢棄物時，應全程穿戴手套，盡量使用夾子來夾取廢棄物。</p>
                    <p>眼手合一，若要用手拿取廢棄物，不論是否穿戴手套，皆須看清楚廢棄物的樣貌再拿取。</p>
                    <p>
                      仔細注意所撿拾的廢棄物是否具有危險性，如：玻璃等易碎物品類、尖銳物品（鐵釘、刀具、針頭、魚鉤、假餌）、易爆物（信號彈、未爆彈）、壓縮氣體類、農藥類、大件網具等，屬於較具危險性的物品。
                    </p>
                    <p style={{ fontWeight: '700' }}>
                      淨灘完成後登記表格中廢棄物的數量，沒有被列出的物品不用登記(但還是要撿喔)。
                    </p>
                  </div>
                  <div
                    className={styles.IntroImg3}
                    onClick={() => {
                      setShowResultCategory(true)
                    }}
                  >
                    <p>*點圖放大</p>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </div>
      <div className={styles.mainBG4}>
        <div className={styles.actionJoin}>
          <div className={styles.title}>
            <h2>參與行動</h2>
          </div>
          <div className={styles.actionGoBG}>
            <Fade top>
              <div className={styles.actionGo}>
                <h3>你可以選擇兩種不同的方式加入行動</h3>
                <div className={styles.actionWay1}>
                  <div className={styles.beHost}></div>
                  <div className={styles.beHostText}>開團發起行動</div>
                </div>
                <div className={styles.actionWay2}>
                  <div className={styles.beMember}></div>
                  <div className={styles.beMemberText}>跟團加入行動</div>
                </div>
                <div className={styles.actionStart}>
                  <Link to="/eventpage">
                    <Button className={styles.actionStartBtn} variant="default">
                      我要參與
                    </Button>
                  </Link>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </div>
      <div className={`${styles.resultCategoryBG} ${showResultCategory ? styles.showResultCategory : ''}`}>
        <div className={styles.resultCategory}>
          <div className={styles.resultCategoryImg} />
          <div className={styles.btnContainer}>
            <Button
              variant="default"
              onClick={() => {
                setShowResultCategory(false)
              }}
            >
              關閉
            </Button>
          </div>
        </div>
      </div>
      <Route path="/eventpage" exact component={EventPage} />
      <div className={styles.toTopBtn} onClick={scrollToTop}>
        ▲
      </div>
      <div className={styles.footer}>Pick Up All Rights Reserved</div>
    </div>
  )
}
