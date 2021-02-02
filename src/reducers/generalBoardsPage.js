import {init as _init, setData as _setData, createReducer, getRoot, getMe} from 'react-reducer-utils'

import * as ServerUtils from './ServerUtils'
import api from './api'
//import * as errors from './errors'

const myClass = 'demo-pttbbs/HotBoardsPage'

export const init = (myID, doMe, parentID, doParent, isByClass, startIdx, title, brdname, isAsc, limit) => {
  let theDate = new Date()
  return (dispatch, getState) => {
    dispatch(_init({myID, myClass, doMe, parentID, doParent, theDate}))
    dispatch(getData(myID, isByClass, startIdx, title, brdname, isAsc, limit, true))
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
    let me = getMe(myID)
    let myList = me.list || []
    let dataList = data.list || []
    let startIdx_i = (startIdx === '') ? 0 : parseInt(startIdx)
    if(isAsc) {
      dataList.map((each, idx) => each['idx'] = startIdx_i+idx)
    } else {
      dataList.map((each, idx) => each['idx'] = startIdx_i-idx)
    }
    if(!isIncludeStartIdx && dataList.length > 0) {
      dataList = dataList.slice(1)
    }
    if(!isAsc) {
      dataList.reverse()
      dataList = dataList.filter((each) => each.idx >= 0)
    }

    let newList = []
    if(isAsc) {
      newList = myList.concat(dataList)
    } else {
      newList = dataList.concat(myList)
    }

    let nextIdx = data.nextIdx || ''
    dispatch(_setData(myID, {nextIdx, list: newList}))
  }
}

export default createReducer()
