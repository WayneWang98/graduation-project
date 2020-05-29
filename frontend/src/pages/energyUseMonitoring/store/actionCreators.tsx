import * as constants from './constants'
import axios from 'axios'

const domain = 'http://localhost:7001'

const getChartData = async (date: string, type: string, local: string) => { // 更新获取图表数据
  const data = {
    date,
    type,
    local
  }
  return await axios.post(domain + '/load/chart', data).then(res => {
    return res.data.data
  })
}


const getTreeData = async () => { // 更新树形菜单数据
  const data = {
    id: localStorage.getItem('station_id')
  }
  return await axios.post(domain + '/local/inverter_tree_local', data).then(res => {
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


export const changeTreeData =  () => {
  return async (dispatch: any) => {
    const action = {
      type: constants.CHANGE_TREE_DATA,
      treeData: await getTreeData()
    }
    dispatch(action)
  }
}