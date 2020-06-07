import { connection } from '../index'
import { getJsonResult, underlineToCamel } from '../utils/utils'

interface ChartReqBody {
  date: string,
  type: string,
  local: string
}

// 使用字符串名访问plotOptions属性。TypeScript知道名字可以有任何值，不仅仅是plotOptions的属性名。
// 因此TypeScript需要向plotOptions添加索引签名，这样它就知道你可以在plotOptions中使用任何属性名。但我建议更改名称的类型，这样它就只能是plotOptions属性之一。
interface DateType {
  [propName: string]: number
}

const getRangeRandomNumber = (min: number, max: number) => { // 生成范围内的随机数(小数点后保留一位)
  let integer = Math.floor(Math.random() * (max - min + 1)) + min
  let decimal = parseFloat(Math.random().toFixed(1))
  return integer + decimal
}
export class LoadController {
  async postAnalysisChart(reqBody: any) {
    const { leafs } = reqBody
    let data = []
    for (let i = 0; i < leafs.length; i++) {
      data.push({
        name: leafs[i].title,
        value: getRangeRandomNumber(70, 107)
      })
    }
    return getJsonResult(data, 200, 'success')
  }

  async postChart(reqBody: ChartReqBody) {
    let { type, local } = reqBody
    let date = reqBody.date
    console.log(type, local, date)
    const sql = `SELECT * FROM tb_load WHERE local_id = '${local}' AND times LIKE "${date}%"`
    const sqlResult = await new Promise(resolve => {
      connection.query(sql, function (error, results) {
        if (error) throw error
        resolve(results)
      })
    })
    let result: any 
    switch(type) {
      case 'day': {
        result = this.handleDataWithDateType(sqlResult, 'day', 23)
        break
      }
      case 'month': {
        const year = new Date(date).getFullYear()
        const month = new Date(date).getMonth() + 1
        const len = new Date(year, month, 0).getDate()
        result = this.handleDataWithDateType(sqlResult, 'month', len)
        break
      }
      case 'year': {
        result = this.handleDataWithDateType(sqlResult, 'year', 12)
        break
      }
      default: break
    }
    
    result = getJsonResult(result, 200, 'success')
    return result
  }

  handleDataWithDateType(data: any, type: string, len: number) { // 根据日期类型对数据进行处理
    let resultArr = [], start = 1
    if (type === 'day') {
      start = 0
    }
    for (let i = start; i <= len; i ++) {
      let activePower = 0, apparentPower = 0, num = 0 // 有功功率，视在功率，每一个时间段i的数据数量
      data.forEach((item: any) => {
        let tempDate = 0, times = item.times
        switch(type) {
          case 'day': {
            tempDate = new Date(times).getHours()
            break
          }
          case 'month': {
            tempDate = new Date(times).getDate()
            break
          }
          case 'year': {
            tempDate = new Date(times).getMonth() + 1
            break
          }
          default: break
        }
        if (i === tempDate) {
          num ++
          activePower += parseFloat(item['active_power'])
          apparentPower += parseFloat(item['apparent_power'])
        }
      })
      activePower /= num
      apparentPower /= num
      resultArr.push({
        times: i,
        activePower: activePower.toFixed(2),
        apparentPower: apparentPower.toFixed(2)
      })
    }
    return resultArr
  }
}

