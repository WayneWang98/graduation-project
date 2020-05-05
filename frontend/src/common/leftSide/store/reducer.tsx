import * as constants from './constants'

const defaultState = {
  openKeys: ['sub1']
}

const reducer = (state = defaultState , action: any)=> {
  if (action.type === constants.CHANGE_OPEN_MENU) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.openKeys = action.openKeys
    return newState
  }
  return state
}

export default reducer