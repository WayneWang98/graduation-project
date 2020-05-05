import * as constants from './constants'

const defaultState = {
  pageName: ['光伏发电', '电站预览']
}

const reducer = (state = defaultState , action: any)=> {
  if (action.type === constants.CHANGE_PAGE_NAME) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.pageName = action.pageName
    return newState
  }
  return state
}

export default reducer