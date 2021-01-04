import React from 'react'
import PropTypes from 'prop-types'
import styles from './Result.module.scss'
import { Button } from 'react-bootstrap'

export function Result(props) {
  const weekdays = '星期日,星期一,星期二,星期三,星期四,星期五,星期六'.split(',')
  const result = props.eventData.results[0]
  const resultList = (
    <div>
      <div className={styles.resultInfo} id="resultInfo">
        <h3>行動資訊</h3>
        <p id="resultTitle">行動主題：{props.eventData.title}</p>
        <p id="resultStartDate">
          活動日期：{new Date(props.eventData.startTime).getFullYear()}/
          {new Date(props.eventData.startTime).getMonth() + 1}/{new Date(props.eventData.startTime).getDate()}{' '}
          {weekdays[new Date(props.eventData.startTime).getDay()]}
        </p>
        <p id="resultTime">
          活動時間：{new Date(props.eventData.startTime).toTimeString().split(':')[0]}:
          {new Date(props.eventData.startTime).toTimeString().split(':')[1]}~
          {new Date(props.eventData.endTime).toTimeString().split(':')[0]}:
          {new Date(props.eventData.endTime).toTimeString().split(':')[1]}
        </p>
      </div>
      <div className={styles.resultsData} id="resultsData">
        <h3>行動成果</h3>
        <div className={styles.resultsDataRow}>
          <p id="resultBottle">寶特瓶：{result?.bottle}</p>
          <p id="resultBottleCap">塑膠瓶蓋：{result?.bottleCap}</p>
          <p id="resultFoodContainer">其他飲料瓶與食物容器：{result?.foodContainer}</p>
        </div>
        <div className={styles.resultsDataRow}>
          <p id="resultNoFoodContainer">非食物的瓶罐與容器：{result?.noFoodContainer}</p>
          <p id="resultPlasticBag">塑膠提袋：{result?.PlasticBag}</p>
          <p id="resultFoodPackage">食品包裝袋：{result?.foodPackage}</p>
        </div>
        <div className={styles.resultsDataRow}>
          <p id="resultStraw">吸管：{result?.straw}</p>
          <p id="resultDrinkCup">外帶飲料杯：{result?.drinkCup}</p>
          <p id="resultTableware">免洗餐具：{result?.tableware}</p>
        </div>
        <div className={styles.resultsDataRow}>
          <p id="resultCan">鐵鋁罐：{result?.can}</p>
          <p id="resultAluminumFoilBag">鋁箔包或利樂包：{result?.aluminumFoilBag}</p>
          <p id="resultGlassBottle">玻璃瓶：{result?.glassBottle}</p>
        </div>
        <div className={styles.resultsDataRow}>
          <p id="resultFishingGear">釣魚用具：{result?.fishingGear}</p>
          <p id="resultFishingTool">漁業浮球、浮筒、漁船防碰墊：{result?.fishingTool}</p>
          <p id="resultFishingNet">漁網與繩子：{result?.fishingNet}</p>
        </div>
        <div className={styles.resultsDataRow}>
          <p id="resultCigaretteButt">菸蒂：{result?.cigaretteButt}</p>
          <p id="resulToothbrush">牙刷：{result?.toothbrush}</p>
          <p id="resultSyringeneedle">針筒、針頭：{result?.syringeneedle}</p>
        </div>
        <div className={styles.resultsDataRow}>
          <p id="resultLighter">打火機：{result?.lighter}</p>
          <p id="resultMetal">金屬製品：{result?.metal}</p>
          <p id="resultHook">魚鉤：{result?.hook}</p>
        </div>
      </div>
    </div>
  )
  return (
    <div className={`${styles.resultBG} ${props.showResult ? styles.showResult : ''}`}>
      <div className={styles.resultOut}>
        {resultList}
        <div className={styles.btns}>
          <Button variant="default" onClick={() => props.handleshowresult(false)}>
            關閉
          </Button>
        </div>
      </div>
    </div>
  )
}

Result.propTypes = {
  eventData: PropTypes.object,
  showResult: PropTypes.bool,
  handleshowresult: PropTypes.func,
}
