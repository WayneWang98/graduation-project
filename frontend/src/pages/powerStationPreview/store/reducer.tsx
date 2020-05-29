import * as constants from './constants'

const defaultState = {
  stationList: [],
  infoWindowData: {
    position: {
      longitude: '',
      latitude: ''
    }
  }
}

const reducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case constants.CHANGE_INFOWINDOW_DATA: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.infoWindowData = action.infoWindowData
      return newState
    }
    case constants.GET_STATION_LIST: {
      const newState = JSON.parse(JSON.stringify(state))
      newState.stationList = action.stationList
      return newState
    }
  }
  return state
}

export default reducer