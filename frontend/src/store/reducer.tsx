import { combineReducers } from 'redux'
import { reducer as leftSideReducer } from '../common/leftSide/store'
import { reducer as mainBreadCrumbReducer } from '../common/mainBreadCrumb/store'
import { reducer as powerStationPreviewReducer } from '../pages/powerStationPreview/store'
import { reducer as inverterInfoReducer } from '../pages/inverterInfo/store'
import { reducer as energyUseMonitoringReducer } from '../pages/energyUseMonitoring/store'
import { reducer as inverterHistoryReducer } from '../pages/inverterHistory/store'
const reducer = combineReducers({
  leftSide: leftSideReducer,
  mainBreadCrumb: mainBreadCrumbReducer,
  powerStationPreview: powerStationPreviewReducer,
  inverterInfo: inverterInfoReducer,
  energyUseMonitoring: energyUseMonitoringReducer,
  inverterHistory: inverterHistoryReducer
})

// const reducer = (state = defaultState, action: any)=> {
//   if (action.type === 'change_page_name') {
//     const newState = JSON.parse(JSON.stringify(state))
//     newState.pageName = action.pageName
//     return newState
//   }
//   if (action.type === 'change_open_menu') {
//     const newState = JSON.parse(JSON.stringify(state))
//     newState.openKeys = action.openKeys
//     return newState
//   }
//   return state
// }

export default reducer