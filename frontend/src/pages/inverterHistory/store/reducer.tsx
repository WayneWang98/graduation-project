import * as constants from './constants'
const defaultState = {
  inverterName: 'inverter1',
  tableData: [],
  pageNo: 1,
  pageSize: 10,
  totalSize: 0,
  inverterId: 4
}
const reducer = (state = defaultState, action: any) => {
  switch(action.type) {
    case constants.CHANGE_INVERTER_NAME: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.inverterName = action.inverterName
      newState.inverterId = action.inverterId
      return newState
    }
    case constants.CHANGE_TABLE_DATA: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.tableData = action.tableData
      newState.totalSize = action.totalSize
      return newState
    }
    case constants.CHANGE_TREE_DATA: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.treeData = action.treeData
      const temp = action.treeData
      if (temp.length) {
        for (let i = 0, len = temp.length; i < len; i ++) { // 初次加载时，加载默认逆变器
          if (temp[i].children[0].children.length) {
            newState.inverterName = temp[i].children[0].children[0].value
            break
          }
        }
      }
      return newState
    }
    default: break
  }
  return state
}

export default reducer