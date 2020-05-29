import * as constants from './constants'
import axios from 'axios'

const domain = 'http://localhost:7001'

const getTreeData = async () => { // 更新树形菜单数据
  const data = {
    id: localStorage.getItem('station_id')
  }
  return await axios.post(domain + '/local/statistical_tree_local', data).then(res => {
    return res.data.data
  })
}
const getChartData = async (list: any) => { // 更新树形菜单数据
  const data = {
    leafs: list
  }
  return await axios.post(domain + '/load/analysis_chart', data).then(res => {
    return res.data.data
  })
}


export const changeTreeData = () => {
  return async (dispatch: any) => {
    const action = {
      type: constants.CHANGE_TREE_DATA,
      treeData: await getTreeData()
    }
    dispatch(action)
  }
}

export const changeCheckedLeaf = (data: any) => {
  return async (dispatch: any) => {
    const action = {
      type: constants.CHANGE_CHECKED_LEAF,
      checkedLeaf: data
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
export const changeChartData = (data: any) => {
  return async (dispatch: any) => {
    const action = {
      type: constants.CHANGE_CHART_DATA,
      chartData: await getChartData(data)
    }
    dispatch(action)
  }
}