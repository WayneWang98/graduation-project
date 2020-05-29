import * as constants from './constants'
import axios from 'axios'

const domain = 'http://localhost:7001'
const getTableData = async () => {
  return await axios.post(domain + '/equipment/list').then(res => {
    return res.data.data
  })
}

export const changeModalState = () => { // 修改模态框的状态
  return (dispatch: any) => {
    const action = {
      type: constants.CHANGE_SHOW_MODAL
    }
    dispatch(action)
  }
}

export const changeTableData = () => { // 修改模态框的状态
  return async (dispatch: any) => {
    const action = {
      type: constants.CHANGE_TABLE_DATA,
      tableData: await getTableData()
    }
    dispatch(action)
  }
}


export const changeModalTitle = (title: string) => { // 修改模态框的名称
  return async (dispatch: any) => {
    const action = {
      type: constants.CHANGE_MODAL_TITLE,
      modalTitle: title
    }
    dispatch(action)
  }
}