import * as constants from './constants'
import axios from 'axios'

const getChartData = async (date: string, type: string, local: string) => { // 更新获取图表数据
  const data = {
    date,
    type,
    local
  }
  return await axios.post('http://localhost:7001/load/chart', data).then(res => {
    return res.data.data
  })
}


export const changeLocal = (local: string) => {
  return (dispatch: any) => {
    const action = {
      type: constants.CHANGE_LOCAL,
      local: local
    }
    dispatch(action)
  }
}

export const changeDateType = (dateType: string) => {
  return (dispatch: any) => {
    const action = {
      type: constants.CHANGE_DATETYPE,
      dateType
    }
    dispatch(action)
  }
}

export const changeDate = (date: string) => {
  return (dispatch: any) => {
    const action = {
      type: constants.CHANGE_DATE,
      date
    }
    dispatch(action)
  }
}

export const changeChartData =  (data: any) => {
  const { local, type, date} = data
  return async (dispatch: any) => {
    const action = {
      type: constants.CHANGE_CHART_DATA,
      chartData: await getChartData(date, type, local)
    }
    dispatch(action)
  }
}