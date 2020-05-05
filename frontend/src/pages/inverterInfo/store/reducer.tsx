import * as constants from './constants'
import { getFormatDate } from '../../../common/utils'

const defaultState = {
  local: '长沙理工大学云塘校区',
  dateType: 'day',
  date: getFormatDate(new Date(), 'day'),
  field: '总有功功率',
  name: 'inverter1',
  previewData: {
    currentOutput: 5000,
    irradiance: 2.3,
    temperature: 23,
    co2Reduction: 10.3,
    equivalentTree: 203,
    totalIncome: 3003
  },
  chartData: [{
    times: '',
    totalActivePower: 111,
    tansTemp1: 23,
    tansTemp2: 22
  }]
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
    default: break
  }
  return state
}

export default reducer