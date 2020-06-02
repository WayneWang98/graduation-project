import { getRandomByLength } from './utils'
import { redisClient } from '../index'

const SMSClient = require('@alicloud/sms-sdk')
const accessKeyId = 'LTAI4GH1f1n9BaCmjUu2gBb8'
const secretAccessKey = 'VOiT8jMJRno88UisKXqCUXlsYJ9ccX'

//初始化sms_client
let smsClient = new SMSClient({
    accessKeyId,
    secretAccessKey
})

export const sendSMS = (phoneNumbers: string) => { // 返回用户与验证码之间的映射
  let code = getRandomByLength(6)
  smsClient.sendSMS({
    PhoneNumbers: phoneNumbers, // 必填:待发送手机号,支持以逗号分隔的形式进行批量调用，目前从前端获取手机号码
    SignName: 'wayne毕业设计', // 必填:短信签名-可在短信控制台中找到
    TemplateCode: 'SMS_191815942', // 必填:短信模板-可在短信控制台中找到,
    TemplateParam: JSON.stringify({
      code
    })
  }).then(function (res: any) {
    let {
      Code
    } = res
    if (Code === 'OK') {
      //处理返回参数
      redisClient.set(phoneNumbers, code + '')
    }
  }, function (err: any) {
    console.log(err)
  })
  
}