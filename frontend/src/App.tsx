import React from 'react'
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom'

import Header from './common/header'
import LeftSide from './common/leftSide'
import MainBreadCrumb from './common/mainBreadCrumb'
import EnergyUseMonitoring from './pages/energyUseMonitoring'
import PowerStationPreview from './pages/powerStationPreview'
import InverterInfo from './pages/inverterInfo'
import InverterHistory from './pages/inverterHistory'
// import StatisticalAnalysis from './pages/statisticalAnalysis'

import './style.less'

function App() {
  return (
    <div>
      <Router>
        <Header></Header>
        <LeftSide></LeftSide>
        <div className={'main-right'}>
          <MainBreadCrumb></MainBreadCrumb>
            <Switch>
              <Route path='/energy_use_monitoring' exact component={EnergyUseMonitoring}></Route>
              <Route path='/power_station_preview' exact component={PowerStationPreview}></Route>
              <Route path='/inverter_info' exact component={InverterInfo}></Route>
              <Route path='/inverter_history' exact component={InverterHistory}></Route>
            </Switch>
          {/* <StatisticalAnalysis></StatisticalAnalysis> */}
        </div>
      </Router>
    </div>
  );
}

export default App
