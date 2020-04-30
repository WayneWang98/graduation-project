import { connection } from '../index'
import { getJsonResult, underlineToCamel } from '../utils/utils'

export class PreviewController {
  async getData() {
    const sql = 'SELECT * FROM tb_station;'
    const results = await new Promise(resolve => {
      connection.query(sql, (error, result) => {
        if (error) {
          throw error
        }
        result = result.map((item: any) => {
          return underlineToCamel(item)
        })
        result = getJsonResult(result, 200, 'success')
        resolve(result)
      })
    })
    return results
  }
}