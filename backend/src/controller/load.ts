import { connection } from '../index'
import { getJsonResult } from '../utils/utils'

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
const DateType: DateType = { // 根据日期类型截取不同长度的字符串
  'year': 4,
  'month':  7,
  'day': 10
}

export class LoadController {
  async postChart(reqBody: ChartReqBody) {
    let { date, type, local } = reqBody
    date = date.substr(0, DateType[type])
    const sql = `SELECT * FROM tb_load WHERE local = "${local}" AND times LIKE "${date}%"`
    const sqlResult = await new Promise(resolve => {
      connection.query(sql, function (error, results) {
        if (error) throw error
        resolve(results)
      })
    })
    let result = this.hanldeData(sqlResult)
    result = getJsonResult(result, 200, 'success')
    return result
  }

  hanldeData(data: any) {
    return data
  }
}

