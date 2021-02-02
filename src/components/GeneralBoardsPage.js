import React, { useEffect, useState } from 'react'
import pageStyles from './Page.module.css'

//import * as errors from './errors'

import { useWindowSize } from 'react-use'

import { useActionDispatchReducer, getRoot, genUUID } from 'react-reducer-utils'

import * as DoGeneralBoardsPage from '../reducers/generalBoardsPage'

import Header from './Header'
import BoardList from './BoardList'
import EmptyBoardList from './EmptyBoardList'

import queryString from 'query-string'

import { getLimitByHeight } from './utils'

import { PROMPT_QUERY } from './constants'

export default (props) => {
  const [stateGeneralBoardsPage, doGeneralBoardsPage] = useActionDispatchReducer(DoGeneralBoardsPage)

  const {width: innerWidth, height: innerHeight} = useWindowSize()
  let width = innerWidth
  let boardListHeight = innerHeight * 0.9
  let limit = getLimitByHeight(boardListHeight)

  //const [errMsg, setErrMsg] = useState('')

  const params = queryString.parse(window.location.search)
  let paramsKeywords = params.keywords || ''
  let startIdx = params.start || ''

  const [isByClass, setIsByClass] = useState(true)
  const [keywords, setKeywords] = useState(paramsKeywords)
  const [startRowIdx, setStartRowIdx] = useState(-1)
  const [endRowIdx, setEndRowIdx] = useState(-1)

  //init

  useEffect(() => {
    let hotBoardsPageID = genUUID()
    doGeneralBoardsPage.init(hotBoardsPageID, doGeneralBoardsPage, null, null, isByClass, startIdx, keywords, keywords, limit)
  }, [])

  //get data
  let generalBoardsPage = getRoot(stateGeneralBoardsPage) || {}
  let myID = generalBoardsPage.id || ''
  //let errmsg = generalBoardsPage.errmsg || ''
  let boards = generalBoardsPage.list || []
  let nextIdx = generalBoardsPage.nextIdx || ''

  //render


  let headerTitle = '所有看板'

  //let allErrMsg = errors.mergeErr(errMsg, errmsg)

  let isToLoadPre = (startRowIdx, newStartRowIdx) => {
    return boards.length > 0 && boards[0].numIdx !== 0 && newStartRowIdx === 0 && startRowIdx !== newStartRowIdx
  }

  let isToLoadNext = (endRowIdx, newEndRowIdx) => {
    return nextIdx !== '' && newEndRowIdx === boards.length - 1 && endRowIdx !== newEndRowIdx
  }

  let onScrollEnd = (x, y, newStartRowIdx, newEndRowIdx) => {
    if(isToLoadPre(startRowIdx, newStartRowIdx)) {
      doGeneralBoardsPage.getData(myID, isByClass, startIdx, keywords, keywords, false, limit)
    }
    if(isToLoadNext(endRowIdx, newEndRowIdx)) {
      doGeneralBoardsPage.getData(myID, isByClass, startIdx, keywords, keywords, true, limit)
    }

    setStartRowIdx(newStartRowIdx)
    setEndRowIdx(newEndRowIdx)
  }

  let renderIsByClass = () => {
    return(
      <div onClick={() => setIsByClass(!isByClass)}>
      </div>
    )
  }

  let renderQuery = () => {
    return(
      <input className='form-control' type='text' placeholder={PROMPT_QUERY} onChange={(e) => setKeywords(e.target.value)}/>
    )
  }

  let cmds = [
    {name: 'isByClass', render: renderIsByClass},
    {name: 'query', render: renderQuery},
  ]

  let renderBoardList = () => {
    if(boards.length === 0) {
      //return (<BoardList boards={boards} width={width} height={boardListHeight}/>)
      return (<EmptyBoardList width={width} height={boardListHeight} prompt={"還沒有任何看板喔～"} />)
    }
    else {
      return (<BoardList boards={boards} width={width} height={boardListHeight} nextIdx={nextIdx} onScrollEnd={onScrollEnd} cmds={cmds} />)
    }
  }

  return (
    <div className={pageStyles['root']}>
      <Header title={headerTitle} />
      {renderBoardList()}
    </div>
  )
}

const _DATA = {"list":[{"bid":"45_hate","brdname":"hate","title":"三位一體～","flag":2097152,"type":"◎","class":"Hate","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"44_sex","brdname":"sex","title":"三位一體～","flag":2097152,"type":"◎","class":"sex ","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"17_Gossiping","brdname":"Gossiping","title":"今晚我想來點...","flag":2097152,"type":"◎","class":"八卦","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"39_cti","brdname":"cti","title":"中天不能亡","flag":2097152,"type":"◎","class":"中天","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"36_fivesix","brdname":"fivesix","title":"56不能亡","flag":2097152,"type":"◎","class":"台灣","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"41_pttcurrent","brdname":"pttcurrent","title":"pttcurrent","flag":2097152,"type":"◎","class":"系統","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"42_food","brdname":"food","title":"food","flag":2097152,"type":"◎","class":"美食","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"46_Announce","brdname":"Announce","title":"DevPtt 公布欄","flag":2097152,"type":"◎","class":"站務","nuser":0,"moderators":["SYSOP","SYSOP2"],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"18_PttOfficial","brdname":"PttOfficial","title":"Ptt 官方 App","flag":2097152,"type":"◎","class":"站務","nuser":0,"moderators":["SYSOP","SYSOP2","SYSOP3","SYSOP4"],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"37_joke","brdname":"joke","title":"歐西里斯的天空熊","flag":2097152,"type":"◎","class":"就可","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"43_cmwang","brdname":"cmwang","title":"簽名王","flag":2097152,"type":"◎","class":"棒球","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"13_test","brdname":"test","title":"測試","flag":2097152,"type":"◎","class":"測試","nuser":0,"moderators":["test"],"reason":"","read":false,"total":1,"last_post_time":1607937366,"stat_attr":1},{"bid":"24_test10","brdname":"test10","title":"測試時","flag":2097152,"type":"◎","class":"測試","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"25_test11","brdname":"test11","title":"測試11","flag":2097152,"type":"◎","class":"測試","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"26_test12","brdname":"test12","title":"測試12","flag":2097152,"type":"◎","class":"測試","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"27_test13","brdname":"test13","title":"測試13","flag":2097152,"type":"◎","class":"測試","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"28_test14","brdname":"test14","title":"測試14","flag":2097152,"type":"◎","class":"測試","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"29_test15","brdname":"test15","title":"測試15","flag":2097152,"type":"◎","class":"測試","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"30_test16","brdname":"test16","title":"測試16","flag":2097152,"type":"◎","class":"測試","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"31_test17","brdname":"test17","title":"測試17","flag":2097152,"type":"◎","class":"測試","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"32_test18","brdname":"test18","title":"測試18","flag":2097152,"type":"◎","class":"測試","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"33_test19","brdname":"test19","title":"測試19","flag":2097152,"type":"◎","class":"測試","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"14_test2","brdname":"test2","title":"測試2","flag":2097152,"type":"◎","class":"測試","nuser":0,"moderators":["SYSOP"],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"34_test20","brdname":"test20","title":"測試20","flag":2097152,"type":"◎","class":"測試","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"35_test21","brdname":"test21","title":"測試21","flag":2097152,"type":"◎","class":"測試","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"40_test22","brdname":"test22","title":"測試22","flag":2097152,"type":"◎","class":"測試","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"47_test23","brdname":"test23","title":"測試23","flag":2097152,"type":"◎","class":"測試","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"15_test3","brdname":"test3","title":"測試3","flag":2097152,"type":"◎","class":"測試","nuser":0,"moderators":["SYSOP120"],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"16_test4","brdname":"test4","title":"測試4","flag":2097152,"type":"◎","class":"測試","nuser":0,"moderators":["SYSOP120"],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"19_test5","brdname":"test5","title":"測試五","flag":2097152,"type":"◎","class":"測試","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"20_test6","brdname":"test6","title":"測試六","flag":2097152,"type":"◎","class":"測試","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"21_test7","brdname":"test7","title":"測試7","flag":2097152,"type":"◎","class":"測試","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"22_test8","brdname":"test8","title":"測試八","flag":2097152,"type":"◎","class":"測試","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"23_test9","brdname":"test9","title":"測試久","flag":2097152,"type":"◎","class":"測試","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"38_babymother","brdname":"babymother","title":"我是媽寶～","flag":2097152,"type":"◎","class":"媽寶","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"6_ALLPOST","brdname":"ALLPOST","title":"跨板式LOCAL新文章","flag":32,"type":"◎","class":"嘰哩","nuser":0,"moderators":[],"reason":"","read":false,"total":6,"last_post_time":1608504383,"stat_attr":1},{"bid":"11_EditExp","brdname":"EditExp","title":"範本精靈投稿區","flag":0,"type":"◎","class":"嘰哩","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"8_Note","brdname":"Note","title":"動態看板及歌曲投稿","flag":0,"type":"◎","class":"嘰哩","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"9_Record","brdname":"Record","title":"我們的成果","flag":32,"type":"◎","class":"嘰哩","nuser":0,"moderators":[],"reason":"","read":false,"total":35,"last_post_time":1612249846,"stat_attr":1},{"bid":"1_SYSOP","brdname":"SYSOP","title":"站長好!","flag":32,"type":"◎","class":"嘰哩","nuser":0,"moderators":[],"reason":"","read":false,"total":0,"last_post_time":0,"stat_attr":1},{"bid":"10_WhoAmI","brdname":"WhoAmI","title":"呵呵，猜猜我是誰！","flag":0,"type":"◎","class":"嘰哩","nuser":10,"moderators":[],"reason":"","read":true,"total":6,"last_post_time":1608504383,"stat_attr":1}],"next_idx":""}
