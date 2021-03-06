import * as constants from './constants'
import { getFormatDate } from '../../../common/utils'

const defaultState = {
  dateType: 'day',
  date: getFormatDate(new Date(), 'day'),
  previewData: {
    currentLoad: '38.3',
    ratio: '11.9', // 比上周同期
    percentage: '12', // 全单位占比
    maxMouthLoad: '55',
    maxYearLoad: '1231'
  },
  local: 2,
  chartData: [],
  treeData: []
}

const reducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case constants.CHANGE_LOCAL: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.local = action.local
      return newState
    }
    case constants.CHANGE_DATETYPE: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.dateType = action.dateType
      return newState
    }
    case constants.CHANGE_DATE: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.date = action.date
      return newState
    }
    case constants.CHANGE_CHART_DATA: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.chartData = action.chartData
      return newState
    }
    case constants.CHANGE_TREE_DATA: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.treeData = action.treeData
      return newState
    }
    default: break
  }
  return state
}
export default reducer