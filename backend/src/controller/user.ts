import { connection, redisClient } from '../index'
import { getJsonResult, getRandomByLength } from '../utils/utils'
import { sendSMS } from '../utils'

const md5 = require('md5-node')

export class User {
  async login(reqBody: any) {
    const { username, password } = reqBody
    const md5Password = md5(password)
    console.log(username, md5Password)
    let result: any = await new Promise(resolve => {
      const sql = `SELECT * FROM tb_user WHERE username = '${username}' AND password = '${md5Password}'`
      connection.query(sql, (err, results) => {
        if (err) {
          throw err
        }
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

  async getVerificationCode() {
    sendSMS('15580919833')
    const result = 'ok'
    return getJsonResult(result, 200, 'success')
  }

  async checkVerificationCode(reqBody: any) { // 检查验证码是否匹配
    const code = reqBody.code
    const result = await new Promise(resolve => {
      redisClient.get('15580919833', (err, res) => {
        let data = ''
        if (err) throw err
        if (res === code) {
          data = 'true'
        } else {
          data = 'false'
        }
        resolve(data)
      })
    })
    return getJsonResult(result, 200, 'success')
  }
}
