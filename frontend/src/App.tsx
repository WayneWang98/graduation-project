import React from 'react'
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import Header from './common/header'
import LeftSide from './common/leftSide'
import MainBreadCrumb from './common/mainBreadCrumb'
import EnergyUseMonitoring from './pages/energyUseMonitoring'
import PowerStationPreview from './pages/powerStationPreview'
import InverterInfo from './pages/inverterInfo'
import InverterHistory from './pages/inverterHistory'
import EquipmentManagement from './pages/equipmentManagement'
import StatisticalAnalysis from './pages/statisticalAnalysis'

import './style.less'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <Header></Header>
          <div className={'main-container'}> 
            <div className={'main-left'}>
              <LeftSide></LeftSide>
            </div>
            <div className={'main-right'}>
              <MainBreadCrumb></MainBreadCrumb>
                <Switch>
                  <Route path='/' exact component={PowerStationPreview}></Route>
                  <Route path='/energy_use_monitoring' exact component={EnergyUseMonitoring}></Route>
                  <Route path='/power_station_preview' exact component={PowerStationPreview}></Route>
                  <Route path='/inverter_info' exact component={InverterInfo}></Route>
                  <Route path='/inverter_history' exact component={InverterHistory}></Route>
                  <Route path='/equipment_management' exact component={EquipmentManagement}></Route>
                  <Route path='/statistical_analysis' exact component={StatisticalAnalysis}></Route>
                </Switch>
            </div>
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App
