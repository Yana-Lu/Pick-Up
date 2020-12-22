import React, { useEffect, useState } from 'react'
import { showResults } from './Firebase'
//scss
import styles from '../scss/Result.module.scss'
import { Button } from 'react-bootstrap'

export function Result(props) {
  console.log(props)
  // let eventId = props.eventId
  let uid = props.uid
  const [results, setResults] = useState([])
  //render result
  useEffect(() => {
    try {
      showResults(uid, setResults)
      console.log(results)
    } catch (err) {
      console.log(err.message)
    }
  }, [uid])
  let obj = results[0]
  useEffect(() => {
    try {
      let resultTitle = document.getElementById('resultTitle')
      let resultStartDate = document.getElementById('resultStartDate')
      let resultTime = document.getElementById('resultTime')
      let startTimeObj = new Date(obj?.startTime)
      let endTimeObj = new Date(obj?.endTime)
      let weekdays = '星期日,星期一,星期二,星期三,星期四,星期五,星期六'.split(',')
      // 抓時間
      let startTimePart = startTimeObj.toTimeString().split(':')
      let endTimePart = endTimeObj.toTimeString().split(':')
      resultTitle.textContent = `行動主題：${obj?.title}`
      resultStartDate.textContent = `活動日期：${startTimeObj.getFullYear()}/${
        startTimeObj.getMonth() + 1
      }/${startTimeObj.getDate()} ${weekdays[startTimeObj.getDay()]}`
      resultTime.textContent = `活動時間：${startTimePart[0]}：${startTimePart[1]}~${endTimePart[0]}：${endTimePart[1]}`
      let resultBottle = document.getElementById('resultBottle')
      let resultBottleCap = document.getElementById('resultBottleCap')
      let resultFoodContainer = document.getElementById('resultFoodContainer')
      let resultNoFoodContainer = document.getElementById('resultNoFoodContainer')
      let resultPlasticBag = document.getElementById('resultPlasticBag')
      let resultFoodPackage = document.getElementById('resultFoodPackage')
      let resultStraw = document.getElementById('resultStraw')
      let resultDrinkCup = document.getElementById('resultDrinkCup')
      let resultTableware = document.getElementById('resultTableware')
      let resultCan = document.getElementById('resultCan')
      let resultAluminumFoilBag = document.getElementById('resultAluminumFoilBag')
      let resultGlassBottle = document.getElementById('resultGlassBottle')
      let resultFishingGear = document.getElementById('resultFishingGear')
      let resultFishingTool = document.getElementById('resultFishingTool')
      let resultFishingNet = document.getElementById('resultFishingNet')
      let resultCigaretteButt = document.getElementById('resultCigaretteButt')
      let resulToothbrush = document.getElementById('resulToothbrush')
      let resultSyringeneedle = document.getElementById('resultSyringeneedle')
      let resultLighter = document.getElementById('resultLighter')
      let resultMetal = document.getElementById('resultMetal')
      let resultHook = document.getElementById('resultHook')
      resultBottle.textContent = `寶特瓶：${obj?.results[0].bottle}`
      resultBottleCap.textContent = `塑膠瓶蓋：${obj?.results[0].bottleCap}`
      resultFoodContainer.textContent = `其他飲料瓶與食物容器：${obj?.results[0].foodContainer}`
      resultNoFoodContainer.textContent = `非食物的瓶罐與容器：${obj?.results[0].noFoodContainer}`
      resultPlasticBag.textContent = `塑膠提袋：${obj?.results[0].PlasticBag}`
      resultFoodPackage.textContent = `食品包裝袋：${obj?.results[0].foodPackage}`
      resultStraw.textContent = `吸管：${obj?.results[0].straw}`
      resultDrinkCup.textContent = `外帶飲料杯：${obj?.results[0].drinkCup}`
      resultTableware.textContent = `免洗餐具：${obj?.results[0].tableware}`
      resultCan.textContent = `鐵鋁罐：${obj?.results[0].can}`
      resultAluminumFoilBag.textContent = `鋁箔包或利樂包：${obj?.results[0].aluminumFoilBag}`
      resultGlassBottle.textContent = `玻璃瓶：${obj?.results[0].glassBottle}`
      resultFishingGear.textContent = `釣魚用具：${obj?.results[0].fishingGear}`
      resultFishingTool.textContent = `漁業浮球、浮筒、漁船防碰墊：${obj?.results[0].fishingTool}`
      resultFishingNet.textContent = `漁網與繩子：${obj?.results[0].fishingNet}`
      resultCigaretteButt.textContent = `菸蒂：${obj?.results[0].cigaretteButt}`
      resulToothbrush.textContent = `牙刷：${obj?.results[0].toothbrush}`
      resultSyringeneedle.textContent = `針筒、針頭：${obj?.results[0].syringeneedle}`
      resultLighter.textContent = `打火機：${obj?.results[0].lighter}`
      resultMetal.textContent = `金屬製品：${obj?.results[0].metal}`
      resultHook.textContent = `魚鉤：${obj?.results[0].hook}`
    } catch (err) {
      console.log(err.message)
    }
  }, [obj])

  function closePopup() {
    let closePopup = document.getElementById('result')
    closePopup.style.display = 'none'
  }
  return (
    <div className={styles.resultBG} id="result">
      <div className={styles.resultOut}>
        <div className={styles.resultInfo} id="resultInfo">
          <h3>行動資訊</h3>
          <p id="resultTitle">行動主題：</p>
          <p id="resultStartDate">活動日期：</p>
          <p id="resultTime">活動時間：</p>
        </div>
        <div className={styles.resultsData} id="resultsData">
          <h3>行動成果</h3>
          <div className={styles.resultsDataRow}>
            <p id="resultBottle">寶特瓶：</p>
            <p id="resultBottleCap">塑膠瓶蓋：</p>
            <p id="resultFoodContainer">其他飲料瓶與食物容器：</p>
          </div>
          <div className={styles.resultsDataRow}>
            <p id="resultNoFoodContainer">非食物的瓶罐與容器：</p>
            <p id="resultPlasticBag">塑膠提袋：</p>
            <p id="resultFoodPackage">食品包裝袋：</p>
          </div>
          <div className={styles.resultsDataRow}>
            <p id="resultStraw">吸管：</p>
            <p id="resultDrinkCup">外帶飲料杯：</p>
            <p id="resultTableware">免洗餐具：</p>
          </div>
          <div className={styles.resultsDataRow}>
            <p id="resultCan">鐵鋁罐：</p>
            <p id="resultAluminumFoilBag">鋁箔包或利樂包：</p>
            <p id="resultGlassBottle">玻璃瓶：</p>
          </div>
          <div className={styles.resultsDataRow}>
            <p id="resultFishingGear">釣魚用具：</p>
            <p id="resultFishingTool">漁業浮球、浮筒、漁船防碰墊：</p>
            <p id="resultFishingNet">漁網與繩子：</p>
          </div>
          <div className={styles.resultsDataRow}>
            <p id="resultCigaretteButt">菸蒂：</p>
            <p id="resulToothbrush">牙刷：</p>
            <p id="resultSyringeneedle">針筒、針頭：</p>
          </div>
          <div className={styles.resultsDataRow}>
            <p id="resultLighter">打火機：</p>
            <p id="resultMetal">金屬製品：</p>
            <p id="resultHook">魚鉤：</p>
          </div>
        </div>
        <div className={styles.btns}>
          <Button variant="default" id="closePopup" onClick={closePopup}>
            關閉
          </Button>
        </div>
      </div>
    </div>
  )
}
