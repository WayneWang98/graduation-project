import * as constants from './constants'
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

const getData = async (pageNo: string, pageSize: string, inverterId: string ) => {
  const data = {
    pageNo,
    pageSize,
    inverterId
  }
  return axios.post(domain + '/inverter/list', data).then(res => {
    return res.data.data
  })
}

export const changeInverterName = (name: string) => {
  return (dispatch: any) => {
    const action = {
      type: constants.CHANGE_INVERTER_NAME,
      inverterName: name,
      inverterId: name.split('-')[1]
    }
    dispatch(action)
  }
}

export const changeTableData = (data: any) => {
  const { pageNo, pageSize, inverterId } = data
  return async (dispatch: any) => {
    const { list, totalSize } = await getData(pageNo, pageSize, inverterId)
    const action = {
      type: constants.CHANGE_TABLE_DATA,
      tableData: list,
      totalSize: totalSize
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
