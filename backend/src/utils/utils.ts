// 将对象中的下划线转化为驼峰
// interface underLineObj {

// }

export const underlineToCamel = (obj: any) => {
  let newObj: any = {}
  for (let x in obj) {
    let tempStr = x
    tempStr = tempStr.replace(/\_(\w)/g, (all, letter: string) => {
      return letter.toUpperCase()
    })
    newObj[tempStr] = obj[x]
  }
  return newObj
}

export const getJsonResult = (obj: any, status: number, message: string) => {
  let newObj: any = {}
  newObj.status = status
  newObj.message = message
  newObj.data = obj
  return JSON.stringify(newObj)
}

export const getMySQLDatetime = (date: Date) => {
  return date.toISOString()
}

export const getRandomByLength = (len: number) => { // 获取一个固定长度的随机数（长度在10以内）
  const number = Math.random() * Math.pow(10, len)
  return parseInt(number + '')
}

export const getSum = (arr : any) => { // 求和函数
  let sum = 0
  arr.forEach((item: any) => {
    sum += parseFloat(item['active_power'])
  })
  return sum
}