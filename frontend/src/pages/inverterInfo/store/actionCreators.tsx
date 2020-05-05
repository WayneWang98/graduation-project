import * as constants from './constants'
import { getFormatDate } from '../../../common/utils'
import axios from 'axios'

const getChartData = async (date: string, type: string, name: string, field: string) => { // 更新获取图表数据
  console.log(111, type)
  const data = {
    date,
    type,
    field,
    name
  }
  return await axios.post('http://localhost:7001/inverter/chart', data).then(res => {
    return res.data.data
  })
}

export const changeDateType = (data: any) => {
  return (dispatch: any) => {
    const action = {
      type: constants.CHANGE_DATE_TYPE,
      dateType: data,
      date: getFormatDate(new Date(), data)
    }
    dispatch(action)
  }
}

export const changeDate = (data: any) => {
  return (dispatch: any) => {
    const action = {
      type: constants.CHANGE_DATE_VALUE,
      date: data
    }
    dispatch(action)
  }
}

export const changeField = (field: any) => {
  return (dispatch: any) => {
    const action = {
      type: constants.CHANGE_FIELD,
      field
    }
    dispatch(action)
  }
}

export const changeChartData =  (data: any) => {
  const { name, type, date, field} = data
  return async (dispatch: any) => {
    const action = {
      type: constants.CHANGE_CHART_DATA,
      chartData: await getChartData(date, type, name, field)
    }
    dispatch(action)
  }
}
