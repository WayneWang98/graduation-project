import { connection } from '../index'
import { options, header } from '../config/inverterTableConfig'

import { underlineToCamel, getJsonResult, getMySQLDatetime } from '../utils/utils'
import { download } from '../utils'

interface ListReqBody {
  pageNo: string,
  pageSize: string,
  inverterId: string
}

interface ChartReqBody {
  date: string,
  type: string,
  name: string,
  field: string
}

interface DateType {
  [propName: string]: number
}

interface FieldType {
  [propName: string]: string
}

const DateType: DateType = { // 根据日期类型截取不同长度的字符串
  'year': 4,
  'month':  7,
  'day': 10
}

const FieldType: FieldType = {
  '总有功功率': 'active_power',
  '总发电量': 'total_output',
  '日发电量': 'daily_output'
}


export class InverterController {
  async previewList(reqBody: any) { // 图表上部的数据预览
    const { inverterId } = reqBody
    const sql = `SELECT * FROM tb_inverter WHERE inverter_id = '${inverterId}' AND times = (SELECT MAX(times) FROM tb_inverter)`
    const result: any = await new Promise(resolve => {
      connection.query(sql, (error, results) => {
        if (error) throw error
        resolve(results)
      })
    })
    if (result.length) {
      const { active_power, tans_temp_1, tans_temp_2, total_output } = result[0]
      const data = {
        currentOutput: active_power,
        temperature: (parseFloat(tans_temp_1) + parseFloat(tans_temp_2)) / 2,
        co2Reduction: (0.997 * parseFloat(total_output) / 1000 / 1000).toFixed(2),
        equivalentTree: (0.997 * parseFloat(total_output) / 5023 / 1000).toFixed(2),
        totalIncome: (0.52 * parseFloat(total_output) / 10000).toFixed(2),
      }
      return getJsonResult(data, 200, 'message')
    } else {
      const data = {
        currentOutput: null,
        temperature: null,
        co2Reduction: null,
        equivalentTree: null,
        totalIncome: null,
      }
      return getJsonResult(data, 200, 'message')
    }
  }

  async postList(reqBody: ListReqBody) {
    const { pageNo, pageSize, inverterId } = reqBody
    const rangeStart = (parseInt(pageNo) - 1) * parseInt(pageSize)
    const totalSizeSql = `SELECT COUNT(*) as total FROM tb_inverter WHERE inverter_id = '${inverterId}'`
    const totalSize = await new Promise(resolve => {
      connection.query(totalSizeSql, function (error, results) {
        if (error) throw error
        resolve(results[0].total)
      })
    })
    const sql = `SELECT * FROM tb_inverter WHERE inverter_id = '${inverterId}' ORDER BY CAST(times as datetime) DESC LIMIT ${rangeStart}, ${pageSize};`
    const result = await new Promise(resolve => {
      connection.query(sql, function (error, results) {
        if (error) throw error
        results = results.map((item: any) => {
          return underlineToCamel(item)
        })
        let list = JSON.parse(JSON.stringify(results))
        let data: any = {}
        data.totalSize = totalSize
        data.list = list
        results = getJsonResult(data, 200, 'message')
        resolve(results)
      })
    })
    return result
  }

  async searchDataByTimeRound(startTime: Date, endTime: Date) { // 查询某一时间段的数据
    // between and 会包含边界，不建议在这里使用
    const sql = `SELECT * FROM tb_inverter WHERE inverter_id = 4 AND times >= '${getMySQLDatetime(startTime)}' AND  times < '${getMySQLDatetime(endTime)}'`
    return await new Promise(resolve => {
      connection.query(sql, (error, results) => {
        if (error) throw error
        resolve(results)
      })
    })
  }

  async postChart(reqBody: ChartReqBody) {
    let { date, type, name, field} = reqBody
    field = FieldType[field]
    let startTime: Date, endTime: Date
    startTime = new Date(date)
    startTime = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), 8, 0, 0) // 转为北京时间
    let arr: any[] = []
    switch(type) {
      case 'day': {
        for (let i = 0; i < 24; i ++) {
          let copyStartTime = new Date(date.valueOf()) // 日期对象的深拷贝
          endTime = new Date(copyStartTime.setHours(startTime.getHours() + 1))
          arr.push(await this.searchDataByTimeRound(startTime, endTime))
          startTime = endTime
        }
        break
      }
      case 'month': {
        const year = startTime.getFullYear()
        const month = startTime.getMonth() + 1
        const len = new Date(year, month, 0).getDate()
        for (let i = 0; i < len; i ++) {
          let copyStartTime = new Date(date.valueOf())
          endTime = new Date(copyStartTime.setDate(startTime.getDate() + 1))
          arr.push(await this.searchDataByTimeRound(startTime, endTime))
          startTime = endTime
        }
        break
      }
      case 'year': {
        for (let i = 0; i < 12; i ++) {
          let copyStartTime = new Date(date.valueOf())
          endTime = new Date(copyStartTime.setMonth(startTime.getMonth() + 1))
          arr.push(await this.searchDataByTimeRound(startTime, endTime))
          startTime = endTime
        }
        break
      }
      default: break
    }
    return getJsonResult(this.handleData(arr), 200, 'success')
  }

  handleData(data: any[]) {
    let arr: any[] = []
    data.forEach((item: any, index: number) => {
      let tansTemp1 = 0, tansTemp2 = 0
      const len = item.length
      item.forEach((element: any) => {
        tansTemp1 += parseFloat(element['tans_temp_1'])
        tansTemp2 += parseFloat(element['tans_temp_2'])
      })
      if (len === 0) {
        arr.push({
          times: index,
          tansTemp1: null,
          tansTemp2: null,
          output: null,
        })
      } else {
        arr.push({
          times: index,
          tansTemp1: (tansTemp1 / len).toFixed(2),
          tansTemp2: (tansTemp2 / len).toFixed(2),
          output: (parseFloat(item[len - 1]['daily_output']) - parseFloat(item[0]['daily_output'])).toFixed(2)
        })
      }
    })
    return arr
  }

  async download() {
    let data: any = []
    data = data.concat(header)
    const sql = `SELECT * FROM tb_inverter WHERE inverter_id = 4`
    const result: any = await new Promise(resolve => {
      connection.query(sql, function (error, results) {
        if (error) throw error
        resolve(results)
      })
    })
    result.forEach((item: any) => {
      data.push([
        new Date(item.times).toLocaleString(),
        item.daily_output,
        item.total_output,
        item.a_phase_current,
        item.b_phase_current,
        item.c_phase_current,
        item.a_phase_voltage,
        item.b_phase_voltage,
        item.c_phase_voltage,
        item.active_power,
        item.tans_temp_1,
        item.tans_temp_2
      ])
    });
    const buffer = await download(options, data)
    return buffer
  }
}

