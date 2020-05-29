import { combineReducers } from 'redux'
import { reducer as leftSideReducer } from '../common/leftSide/store'
import { reducer as mainBreadCrumbReducer } from '../common/mainBreadCrumb/store'
import { reducer as powerStationPreviewReducer } from '../pages/powerStationPreview/store'
import { reducer as inverterInfoReducer } from '../pages/inverterInfo/store'
import { reducer as energyUseMonitoringReducer } from '../pages/energyUseMonitoring/store'
import { reducer as inverterHistoryReducer } from '../pages/inverterHistory/store'
import { reducer as equipmentManagementReducer } from '../pages/equipmentManagement/store'
import { reducer as statisticalAnalysisReducer } from '../pages/statisticalAnalysis/store'
const reducer = combineReducers({
  leftSide: leftSideReducer,
  mainBreadCrumb: mainBreadCrumbReducer,
  powerStationPreview: powerStationPreviewReducer,
  inverterInfo: inverterInfoReducer,
  energyUseMonitoring: energyUseMonitoringReducer,
  inverterHistory: inverterHistoryReducer,
  equipmentManagement: equipmentManagementReducer,
  statisticalAnalysis: statisticalAnalysisReducer
})

export default reducer