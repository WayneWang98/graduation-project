import * as constants from './constants'
import { getFormatDate } from '../../../common/utils'
import axios from 'axios'

const domain = 'http://localhost:7001'

const getTreeData = async () => { // 获取树状选择器数据
  const data = {
    id: localStorage.getItem('station_id')
  }
  return await axios.post(domain + '/local/tree_select_data', data).then(res => {
    return res.data.data
  })
}

const getChartData = async (date: string, type: string, name: string, field: string) => { // 更新获取图表数据
  const data = {
    date,
    type,
    field,
    name
  }
  return await axios.post(domain + '/inverter/chart', data).then(res => {
    return res.data.data
  })
}

const getPreviewData = async (name: string) => { // 更新获取预览数据
  const data = {
    inverterId: name.split('-')[1]
  }
  return await axios.post(domain + '/inverter/preview', data).then(res => {
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

export const changeTreeData =  () => {
  return async (dispatch: any) => {
    const action = {
      type: constants.CHANGE_TREE_DATA,
      treeData: await getTreeData()
    }
    dispatch(action)
  }
}

export const changeTreeSelect = (name: string) => {
  return async (dispatch: any) => {
    const action = {
      type: constants.CHANGE_TREE_SELECT,
      name  
    }
    dispatch(action)
  }
}


export const changePreviewData = (name: string) => {
  return async (dispatch: any) => {
    const action = {
      type: constants.CHANGE_PREVIEW_DATA,
      previewData: await getPreviewData(name)
    }
    dispatch(action)
  }
}