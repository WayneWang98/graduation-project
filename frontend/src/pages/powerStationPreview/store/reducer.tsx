import * as constants from './constants'

const defaultState = {
  stationList: [{
    id: 1,
    name: '长沙理工大学',
    imgSrc: 'http://localhost:8099/file/cslg.jpg',
    scale: 10,
    currentPower: 200,
    dailyOutput: 11,
    totalOutput: 23,
    longitude: '112.97730446',
    latitude: '28.15396816',
    times: (new Date()).toLocaleString()
  }, {
    id: 2,
    name: '常德汽车站',
    imgSrc: 'http://localhost:8099/file/cslg.jpg',
    scale: 100,
    currentPower: 300,
    dailyOutput: 11,
    totalOutput: 23,
    longitude: '111.6331056',
    latitude: '28.9983724',
    times: (new Date()).toLocaleString()
  }, {
    id: 3,
    name: '株洲车溪村',
    imgSrc: 'http://localhost:8099/file/cslg.jpg',
    scale: 20,
    currentPower: 113,
    dailyOutput: 11,
    totalOutput: 23,
    longitude: '113.927789',
    latitude: '26.562402',
    times: (new Date()).toLocaleString()
  }],
  infoWindowData: {
    position: {
      longitude: '112.97730446',
      latitude: '28.15396816'
    }
  }
}

const reducer = (state = defaultState, action: any) => {
  if (action.type === constants.CHANGE_INFOWINDOW_DATA) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.infoWindowData = action.infoWindowData
    return newState
  }
  return state
}

export default reducer