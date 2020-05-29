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