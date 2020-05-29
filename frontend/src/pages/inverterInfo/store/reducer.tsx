import * as constants from './constants'
import { getFormatDate } from '../../../common/utils'

const defaultState = {
  dateType: 'day',
  date: getFormatDate(new Date(), 'day'),
  field: '总有功功率',
  name: 'id-4',
  previewData: {
    currentOutput: 0,
    irradiance: 0,
    temperature: 0,
    co2Reduction: 0,
    equivalentTree: 0,
    totalIncome: 0
  },
  chartData: [{
    times: '',
    totalActivePower: 111,
    tansTemp1: 23,
    tansTemp2: 22
  }],
  treeData: []
}

const reducer = (state = defaultState, action: any) => {
  const { type } = action
  switch(type) {
    case constants.CHANGE_DATE_TYPE: { // 更改日期类型时，需求是要重新获取当前时间
      const newState = JSON.parse(JSON.stringify(state))
      newState.dateType = action.dateType
      newState.date = action.date
      return newState
    }
    case constants.CHANGE_DATE_VALUE: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.date = action.date
      return newState
    }
    case constants.CHANGE_FIELD: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.field = action.field
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
      const temp = action.treeData
      if (temp.length) {
        for (let i = 0, len = temp.length; i < len; i ++) { // 初次加载时，加载默认逆变器
          if (temp[i].children[0].children.length) {
            newState.name = temp[i].children[0].children[0].value
            break
          }
        }
      }
      return newState
    }
    case constants.CHANGE_TREE_SELECT: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.name = action.name
      return newState
    }
    case constants.CHANGE_PREVIEW_DATA: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.previewData = action.previewData
      return newState
    }
    default: break
  }
  return state
}

export default reducer