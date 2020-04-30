import { connection } from '../index'
import { getJsonResult } from '../utils/utils'

export class User {
  async login(reqBody: any) {
    const { username, password } = reqBody
    console.log(username, password)
    let result: any = await new Promise(resolve => {
      const sql = `SELECT * FROM tb_user WHERE username = '${username}' AND password = '${password}'`
      connection.query(sql, (err, results) => {
        if (err) {
          throw err
        }
        console.log(results)
        resolve(results)
      })
    })
    if (result.length) {
      result = {
        success: 'success'
      }
    } else {
      result = {
        success: 'failed'
      }
    }
    return getJsonResult(result, 200, 'success')
  }
}
