import * as constants from './constants'

export const changeInfoWindowData = (data: any) => {
  return (dispatch: any) => {
    const action = {
      type: constants.CHANGE_INFOWINDOW_DATA,
      infoWindowData: data
    }
    dispatch(action)
  }
}