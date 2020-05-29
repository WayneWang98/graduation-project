import React, { Component } from 'react'
import { withRouter } from 'react-router'

import { connect } from 'react-redux'
import { actionCreators } from '../store'

import { Map, Markers, InfoWindow } from 'react-amap'

import styles from '../style.module.less'

interface PropsTypes {
  stationList: any,
  changeInfoWindow: (data: any) => void,
  infoWindowData: any,
  history: any
}

class PowerStationMap extends Component<PropsTypes> {
  state = {
    amapkey: '2be5a53e8150bc5c58cc0db2352dbd64',
    version: '1.4.0',
    visible: false,
    size: {
      width: 200,
      height: 200
    }
  }

  render() {
    const markersList = this.getMapMarks()
    const { name, scale, totalOutput, dailyOutput, currentPower} = this.props.infoWindowData
    return (
      <div className={styles['map-container']}>
        <Map 
          amapkey={this.state.amapkey} 
          version={this.state.version}
          zoom={7}
        >
          <Markers 
            markers={markersList}
            events={{
              click: this.handleMarkersClick
            }}
          />
          <InfoWindow
            position={this.props.infoWindowData.position}
            visible={this.state.visible}
            isCustom={false}
            size={this.state.size}
            events={{
              created: (instance: any) => {
                instance.setAnchor('bottom-left')
              }
            }}
          >
          <div>
            <h3 onClick={this.toInverterInfo}>{name}</h3>
            <p>电站规模：{scale}kW</p>
            <p>当前功率：{totalOutput}kWh</p>
            <p>日发电量：{dailyOutput}kW</p>
            <p>累计发电量：{currentPower}kW</p>
          </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }

  toInverterInfo = () => {
    this.props.history.push('inverter_info')
  }

  handleMarkersClick = (e: any, marker: any) => {
    if (this.state.visible === false) {
      this.setState({
        visible: true
      })
    }
    const extData = marker.getExtData()
    const { id, name, scale, currentPower, dailyOutput, totalOutput} = extData
    const position = {
      longitude: e.lnglat.lng,
      latitude: e.lnglat.lat
    }
    this.props.changeInfoWindow({
      position,
      id,
      name,
      scale,
      currentPower,
      dailyOutput,
      totalOutput
    })
  }

  getMapMarks = () => {
    return this.props.stationList.map((item: any) => {
      return {
        name: item.name,
        id: item.id,
        scale: item.scale,
        currentPower: item.currentPower,
        dailyOutput: item.dailyOutput,
        totalOutput: item.totalOutput,
        position: {
          longitude: item.longitude,
          latitude: item.latitude
        }
      }
    })
  }
}

const mapStateToProps = (state: any) => {
  return {
    stationList: state.powerStationPreview.stationList,
    infoWindowData: state.powerStationPreview.infoWindowData
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    changeInfoWindow(data: any) {
      dispatch(actionCreators.changeInfoWindowData(data))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PowerStationMap as any))