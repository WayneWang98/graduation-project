// 生成excel表格
const xlsx = require('node-xlsx')


export const download = async (options: any, data: any) => {
  let buffer = xlsx.build([ // 根据数据加载出二进制流
    {
      name: '逆变器历史数据',
      data
    }
  ], options)
  return buffer
}