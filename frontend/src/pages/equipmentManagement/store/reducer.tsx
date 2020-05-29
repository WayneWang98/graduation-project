import * as constants from './constants'

const defaultState = {
  showModal: false,
  tableData: [],
  modalTitle: '添加设备'
}

const reducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case constants.CHANGE_SHOW_MODAL: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.showModal = !newState.showModal
      return newState
    }
    case constants.CHANGE_TABLE_DATA: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.tableData = action.tableData
      return newState
    }
    case constants.CHANGE_MODAL_TITLE: {
      const newState = JSON.parse(JSON.stringify(state))
      console.log(newState)
      newState.modalTitle = action.modalTitle
      return newState
    }
    default: break
  }
  return state
}
export default reducer