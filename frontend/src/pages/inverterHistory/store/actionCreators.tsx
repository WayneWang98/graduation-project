import * as constants from './constants'

export const changeInverterName = (name: string) => {
  return (dispatch: any) => {
    const action = {
      type: constants.CHANGE_INVERTER_NAME,
      inverterName: name
    }
    dispatch(action)
  }
}