import * as constants from './constants'

export const changeOpenMenu = (keys: any) => {
  return (dispatch: any) => {
    const action = {
      type: constants.CHANGE_OPEN_MENU,
      openKeys: keys
    }
    dispatch(action)
  }
}