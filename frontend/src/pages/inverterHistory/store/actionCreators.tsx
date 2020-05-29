import * as constants from './constants'
import axios from 'axios'
const domain = 'http://localhost:7001'

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
      inverterName: name
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
