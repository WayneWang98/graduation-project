import { connection } from '../index'
import { underlineToCamel, getJsonResult } from '../utils/utils'

interface ListReqBody {
  pageNo: string,
  pageSize: string,
  name: string
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
  '总有功功率': 'total_active_power',
  '总发电量': 'total_output',
  '日发电量': 'daily_output'
}

export class InverterController {
  async postList(reqBody: ListReqBody) {
    const { pageNo, pageSize, name } = reqBody
    const rangeStart = (parseInt(pageNo) - 1) * parseInt(pageSize)
    const sql = `SELECT * FROM tb_inverter WHERE inverter_name = '${name}' ORDER BY CAST(times as datetime) DESC LIMIT ${rangeStart}, ${pageSize};`
    const result = await new Promise(resolve => {
      connection.query(sql, function (error, results) {
        if (error) throw error
        console.log(results.length)
        results = results.map((item: any) => {
          return underlineToCamel(item)
        })
        results = getJsonResult(results, 200, 'message')
        resolve(results)
      })
    })
    return result
  }

  handleDataWithDateType(data: any, len: number, dateType: string, field: string) { // 处理不同日期类型的数据：年、月、日
    let arr = []
    field = field.replace(/\_(\w)/g, (all, letter: string) => {
      return letter.toUpperCase()
    })
    for (let i = 0; i < len; i ++) {
      let averageTotalValue = 0, averageTansTemp1 = 0, averageTansTemp2 = 0, num = 0
      data.forEach((item: any) => {
        const date = new Date(item.times)
        let temp: number = 0
        switch(dateType) {
          case 'day': {
            temp = date.getHours()
            break
          }
          case 'month': {
            temp = date.getDate()
            break
          }
          case 'year': {
            temp = date.getMonth() + 1 
            break
          }
          default: break
        }
        if (temp === i) {
          num ++
          averageTotalValue += parseFloat(item[field])
          averageTansTemp1 += parseFloat(item['tansTemp1']) 
          averageTansTemp2 += parseFloat(item['tansTemp2'])
        }
      })
      averageTotalValue /= num
      averageTansTemp1 /= num
      averageTansTemp2 /= num
      arr.push(underlineToCamel({
        times: i,
        total_active_power: averageTotalValue.toFixed(2),
        tans_temp_1: averageTansTemp1.toFixed(2),
        tans_temp_2: averageTansTemp2.toFixed(2)
      }))
    }
    return arr
  }

  async postChart(reqBody: ChartReqBody) {
    let { date, type, name, field} = reqBody
    date = date.substr(0, DateType[type])
    field = FieldType[field]
    const sql = `SELECT id, ${field}, tans_temp_1, tans_temp_2, times FROM tb_inverter WHERE local = '长沙理工大学云塘校区' AND inverter_name = '${name}' AND times LIKE "${date}%"`
    const result = await new Promise(resolve => {
      connection.query(sql, (error, results) => {
        if (error) throw error
        results = results.map((item: any) => {
          return underlineToCamel(item)
        })
        switch(type) { // 根据不同的日期类型进行数据处理
          case 'day': {
            results = this.handleDataWithDateType(results, 24, 'day', field)
            break
          }
          case 'month': {
            results = this.handleDataWithDateType(results, 30, 'month', field)
            break
          }
          case 'year': {
            results = this.handleDataWithDateType(results, 12, 'year', field)
            break
          }
          default: break
        }
        results = getJsonResult(results, 200, 'message')
        resolve(results)
      })
    })
    return result
  }
}

