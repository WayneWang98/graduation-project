import * as constants from './constants'
import { getFormatDate } from '../../../common/utils'

const defaultState = {
  dateType: 'day',
  date: getFormatDate(new Date(), 'day'),
  chartData: [],
  treeData: [],
  checkedLeaf: []
}

const reducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case constants.CHANGE_TREE_DATA: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.treeData = action.treeData
      return newState
    }
    case constants.CHANGE_CHECKED_LEAF: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.checkedLeaf = action.checkedLeaf
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
    default: break
  }
  return state
}
export default reducer