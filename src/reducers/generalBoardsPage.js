import {init as _init, setData as _setData, createReducer, getMe} from 'react-reducer-utils'

import * as ServerUtils from './ServerUtils'
import api from './api'
//import * as errors from './errors'

const myClass = 'demo-pttbbs/HotBoardsPage'

export const init = (myID, doMe, parentID, doParent, isByClass, startIdx, title, brdname, limit) => {
  let theDate = new Date()
  return (dispatch, getState) => {
    dispatch(_init({myID, myClass, doMe, parentID, doParent, theDate}))
    dispatch(getData(myID, isByClass, startIdx, title, brdname, true, limit, true))
  }
}

export const getData = (myID, isByClass, startIdx, title, brdname, isAsc, limit, isIncludeStartIdx) => {
  if(isByClass) {
    return _getDataByClass(myID, startIdx, title, brdname, isAsc, limit, isIncludeStartIdx)
  } else {
    return _getDataByName(myID, startIdx, title, brdname, isAsc, limit, isIncludeStartIdx)
  }
}

const _getDataByClass = (myID, startIdx, title, brdname, isAsc, limit, isIncludeStartIdx) => {
  return (dispatch, getState) => (async() => {
    const {data, errmsg, status} = await api(ServerUtils.LoadGeneralBoardsByClass(startIdx, title, brdname, isAsc, limit))

    if(status !== 200) {
      dispatch(_setData(myID, {errmsg}))
      return
    }

    dispatch(_integrateBoardList(myID, data, startIdx, isAsc, isIncludeStartIdx))
  })()
}

const _getDataByName = (myID, startIdx, title, brdname, isAsc, limit, isIncludeStartIdx) => {
  return (dispatch, getState) => (async() => {
    const {data, errmsg, status} = await api(ServerUtils.LoadGeneralBoards(startIdx, title, brdname, isAsc, limit))

    if(status !== 200) {
      dispatch(_setData(myID, {errmsg}))
      return
    }

    dispatch(_integrateBoardList(myID, data, startIdx, isAsc, isIncludeStartIdx))
  })()
}

const _integrateBoardList = (myID, data, startIdx, isAsc, isIncludeStartIdx) => {
  return (dispatch, getState) => {
    const state = getState()
    let me = getMe(state) || {}
    let myList = me.list || []
    let dataList = data.list || []
    if(!isIncludeStartIdx && dataList.length > 0) {
      dataList = dataList.slice(1)
    }
    if(dataList.length === 0) {
      return
    }

    let newList = []

    let estStartNumIdx = idxToNumIdx(startIdx, data)

    if(isAsc) {
      let startNumIdx = (myList.length === 0) ? estStartNumIdx : (myList[myList.length-1].numIdx+1)
      dataList.map((each, idx) => each.numIdx = startNumIdx+idx)
      newList = myList.concat(dataList)
    } else {
      let startNumIdx = (myList.length === 0) ? estStartNumIdx : (myList[0].numIdx-1)
      dataList.map((each, idx) => each.numIdx = startNumIdx-idx)
      dataList = dataList.filter((each) => each.numIdx >= 1)
      dataList.reverse()
      newList = dataList.concat(myList)
    }

    let nextIdx = data.nextIdx || ''
    dispatch(_setData(myID, {nextIdx, list: newList}))
  }
}

const idxToNumIdx = (idx, data) => {
  return (idx === '') ? 0 : parseInt(idx)
}

export default createReducer()
