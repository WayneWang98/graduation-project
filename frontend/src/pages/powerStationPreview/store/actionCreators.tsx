import * as constants from './constants'
import axios from 'axios'

const getStationData = async () => {
  return await axios.post('http://localhost:7001/preview/list')
  .then((res) => {
    return res.data.data
  })
}


export const getStationList = () => {
  return async (dispatch: any) => {
    const action = {
      type: constants.GET_STATION_LIST,
      stationList: await getStationData()
    }
    dispatch(action)
  }
}

export const changeInfoWindowData = (data: any) => {
  return (dispatch: any) => {
    const action = {
      type: constants.CHANGE_INFOWINDOW_DATA,
      infoWindowData: data
    }
    dispatch(action)
  }
}