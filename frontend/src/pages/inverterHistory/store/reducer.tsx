import * as constants from './constants'
const defaultState = {
  inverterName: 'inverter1'
}
const reducer = (state = defaultState, action: any) => {
  switch(action.type) {
    case constants.CHANGE_INVERTER_NAME: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.inverterName = action.inverterName
      return newState
    }
    default: break
  }
  return state
}

export default reducer