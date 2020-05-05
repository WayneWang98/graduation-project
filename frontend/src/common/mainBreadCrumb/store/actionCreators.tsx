import * as constants from './constants'

export const changPageName = (keys: any) => {
  return (dispatch: any) => {
    const action = {
      type: constants.CHANGE_PAGE_NAME,
      pageName: keys
    }
    dispatch(action)
  }
}