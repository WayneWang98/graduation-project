// 封装的一些公用方法

export const getChineseDate = (date: string) => { // date格式：以横线连接
  let newDate = new Date(date)
  const arr = date.split('-')
  const len = arr.length
  const day = newDate.getDate()
  const month = newDate.getMonth() + 1
  const year = newDate.getFullYear()
  switch(len) {
    case 1: {
      return year + '年'
    }
    case 2: {
      return year + '年' + month + '月'
    }
    case 3: {
      return year + '年' + month + '月' + day + '日'
    }
  }
}

export const getFormatDate = (date: Date, type: string) => { // yyyy-mm-dd 或 yyyy-mm 或 yyyy
  let day = date.getDate()
  let month = date.getMonth() + 1
  let year = date.getFullYear()
  let newDay: string, newMonth: string
  if (day < 10) {
    newDay = '0' + day
  } else {
    newDay = day + ''
  }
  if (month < 10) {
    newMonth = '0' + month 
  } else {
    newMonth = month + ''
  }
  switch(type) {
    case 'day': {
      return year + '-' + newMonth + '-' + newDay
    }
    case 'month': {
      return year + '-' + newMonth
    }
    case 'year': {
      return year + ''
    }
    default: return ''
  }
}


export const downloadByBinary = (data: any, title: string) => { // 根据二进制流下载表格
  const blob = new Blob([data])
  let downloadElement = document.createElement('a')
  const href = window.URL.createObjectURL(blob); //创建下载的链接
  downloadElement.href = href
  downloadElement.download = title //下载后文件名
  document.body.appendChild(downloadElement)
  downloadElement.click() //点击下载
  document.body.removeChild(downloadElement) //下载完成移除元素
  window.URL.revokeObjectURL(href) //释放掉blob对象
}